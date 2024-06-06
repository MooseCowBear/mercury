class Api::V1::PublicChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:show, :update]
  before_action :confirm_ownership, only: [:update]
  
  def index
    chats = Chat.public_chats.visible.order(updated_at: :desc).includes(:last_message)
    render json: chats, include: [:last_message]
  end

  def create
    PublicChat::DestroyService.call
    chat = Chat.new(chat_params)
    if chat.save 
      current_user.update(current_chat_id: chat.id)
      render json: current_user
    else
      render json: { message: "Validations Failed", 
                    errors: chat.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  private 

  def chat_params 
    params.require(:public_chat).permit(:name, :is_private)
  end

  def set_chat
    @chat = Chat.public_chats.find(params[:id])
  end
end
