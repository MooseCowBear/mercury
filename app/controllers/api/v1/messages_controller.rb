class Api::V1::MessagesController < ApplicationController
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
  end

  def destroy
  end

  private 

  def message_params 
    params.require(:message).permit(:body, :room_id)
  end
end
