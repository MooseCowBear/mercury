class Api::V1::PublicChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:show, :update]
  before_action :confirm_ownership, only: [:update]
  
  def index
    chats = Chat.public_chats.active.order(:created_at)
    render json: chats 
  end

  def create
    chat = Chat.new(chat_params)
    if chat.save 
      render json: chat
    else
      render json: { message: "Validations Failed", 
                    errors: chat.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def show
    if @chat.participant?(current_user)
      messages = @chat.chat_messages(current_user)
      render json: messages, include: [:user]
    else
      render json: { message: "Unauthorized", 
                    errors: ["This private chat does not belong to you"] },
                    status: 401
    end
  end

  def update
    if @chat.update(chat_params)
      render json: @chat
    else
      render json: { message: "Validations Failed", 
                    errors: @chat.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  private 

  def chat_params 
    params.require(:chat).permit(:name, :is_private)
  end

  def set_chat
    @chat = Chat.find(params[:id])
  end
end
