class Api::V1::PrivateChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:destroy]
  
  def index 
    chats = current_user.chats.has_message.order(updated_at: :desc) # these are the chats had through chat participants
    render json: chats.to_json({ user: current_user })
  end

  def create
    chat = PrivateChat::CreateService.call(private_chat_params, current_user)
    if chat&.valid?
      current_user.update(current_chat_id: chat.id)
      render json: current_user.to_json
    else
      render json: { message: "Something went wrong", 
                    errors: chat.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  private

  def set_chat
    @chat = current_user.chats.find(params[:id])
  end

  def private_chat_params
    params.require(:private_chat).permit(:name, chat_participants_attributes: [:user_id])
  end
end
