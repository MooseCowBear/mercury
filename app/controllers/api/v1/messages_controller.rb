class Api::V1::MessagesController < ApplicationController
  before_action :set_message, only: [:update, :delete]
  before_action :confirm_ownership, only: [:update, :delete]

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
    # need to finish
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
      redirect_to_root_path
    end
  end
end
