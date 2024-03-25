class Api::V1::MessagesController < ApplicationController
  include ConfirmParticipantConcern

  before_action :set_message, only: [:update]
  before_action :confirm_participant, only: [:create]
  before_action :delete_from_cloudinary, only: [:destroy] # TODO: can be a method on model
  before_action :confirm_text_message, only: [:update]
  after_action -> { current_user.update_last_active if current_user }

  def index
    messages = current_user.current_chat.chat_messages(current_user) # not sure this param  will stay
    render json: messages, include: [:user], methods: [:is_private] # check this
  end

  def create
    message = Message.new(message_params)
    message.user = current_user

    if message.save 
      Notifications::CreateService.call(message)
      Message::BroadcastService.call(message)
      render json: message.to_json(include: [:user], methods: [:is_private])
    else
      render json: { message: "Validations Failed", 
                    errors: message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def update
    if @message.update(message_params) 
      Message::BroadcastService.call(@message)
      render json: @message.to_json(include: [:user], methods: [:is_private])
    else
      render json: { message: "Validations Failed", 
                    errors: @message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def destroy
    

    render json: message.to_json(include: [:user], methods: [:is_private]) # so frontend can remove the message
  end

  private 

  def message_params 
    params.require(:message).permit(:body, :chat_id, :image)
  end

  def set_message
    @message = current_user.messages.find(params[:id])
  end

  def delete_from_cloudinary
    return unless @message.public_id 
    res = Cloudinary::Uploader.destroy(@message.public_id)

    unless res["result"] == "ok"
      render json: { message: "Image could not be deleted at this time", 
                    errors: "Cloud storage failure." }, 
                    status: :unprocessable_entity
    end
  end

  def confirm_text_message
    unless @message.body
      flash[:alert] = "Only text messages can be edited."
      redirect_to chat_path
    end
  end
end
