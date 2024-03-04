class Api::V1::MessagesController < ApplicationController
  include ConfirmParticipantConcern

  before_action :set_message, only: [:update, :destroy]
  before_action :confirm_participant, only: [:create]
  before_action :confirm_ownership, only: [:update, :destroy]
  before_action :delete_from_cloudinary, only: [:destroy]
  before_action :confirm_text_message, only: [:update]
  after_action -> { current_user.update_last_active if current_user }

  def create
    message = Message.new(message_params)
    message.user = current_user

    if message.save 
      render json: message.to_json(include: [:user])
    else
      render json: { message: "Validations Failed", 
                    errors: message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def update
    if @message.update(message_params) 
      render json: @message.to_json(include: [:user])
    else
      render json: { message: "Validations Failed", 
                    errors: @message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def destroy
    @message.destroy
    render json: @message.to_json(include: [:user])
  end

  private 

  def message_params 
    params.require(:message).permit(:body, :chat_id, :image)
  end

  def set_message
    @message = Message.find(params[:id])
  end

  def confirm_ownership
    unless @message.user == current_user
      flash[:alert] = "You cannot modify a message that doesn't belong to you."
      redirect_to root_path
    end
  end

  def delete_from_cloudinary
    return unless @message.public_id 
    res = Cloudinary::Uploader.destroy(@message.public_id)

    unless res["result"] == "ok"
      flash[:alert] = "Message could not be deleted at this time."
      redirect_to chat_path # is this what we want?
    end
  end

  def confirm_text_message
    unless @message.body
      flash[:alert] = "Only text messages can be edited."
      redirect_to chat_path
    end
  end
end
