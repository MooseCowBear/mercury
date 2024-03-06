class Api::V1::PrivateChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:destroy]
  
  def index
    chats = current_user.chats # these are the chats had through chat participants
    render json: chats, include: [:users] # check this
  end

  def create
    chat = PrivateChatCreateService.new(private_chat_params, current_user).call
    render json: chat.to_json(include: [:user])
  end

  def destroy
    @chat.private_chat_destroy(current_user)
    
    render json: @chat
  end

  private

  def set_chat
    @chat = current_user.chats.find(params[:id])
  end

  # check this
  def private_chat_params
    params.require(:chat).permit(chat_participants_attributes: [:user_id]) # arr of users
  end
end
