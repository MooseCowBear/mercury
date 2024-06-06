class Api::V1::PrivateChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  
  def index 
    # TODO: figure out how to fix this
    chats = current_user.chats.has_message.order(updated_at: :desc)
    render json: chats.as_json({ user: current_user })
  end

  def create
    chat = PrivateChat::CreateService.call(private_chat_params, current_user)
    if chat&.valid?
      current_user.update(current_chat_id: chat.id)
      render json: current_user
    else
      render json: { message: "Something went wrong", 
                    errors: chat.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  private

  def private_chat_params
    params.require(:private_chat).permit(:name, chat_participants_attributes: [:user_id])
  end
end
