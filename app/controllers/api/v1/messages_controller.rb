class Api::V1::MessagesController < ApplicationController
  before_action :set_message, only: [:update, :destroy]
  before_action :confirm_ownership, only: [:update, :destroy]
  after_action -> {current_user.update_last_active if current_user}

  def create
    message = Message.new(message_params)
    message.user = current_user

    unless message.room.participant?(current_user)
      render json: { message: "Unauthorized", 
                    errors: ["This private chat does not belong to you"] }, 
                    status: 401
      return
    end

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
    params.require(:message).permit(:body, :room_id)
  end

  def set_message
    @message = Message.find(params[:id])
  end

  def confirm_ownership
    unless @message.user == current_user
      flash[:alert] = "You cannot modify a message that doesn't belong to you."
      redirect_to_root_path
    end
  end
end
