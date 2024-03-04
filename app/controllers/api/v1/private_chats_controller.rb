class Api::V1::PrivateChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:destroy]
  before_action :verify_private_participant, only: [:destroy]
  
  def index
    chats = Chat.user_private_chats(current_user)
    render json: chats, include: [] # replace with participants
  end

  def create
    # TODO: Update
    chat = Chat.private_chat_create(current_user, params[:user_id])

    render json: chat, include: [] #replace with participants
  end

  def destroy
    @chat.private_chat_destroy(current_user)
    
    render json: @chat
  end

  private

  def set_chat
    @chat = Chat.find(params[:id])
  end

  # will change
  def verify_private_participant
    unless @chat.is_private && @chat.participant?(current_user)
      flash[:alert] = "You're request could not be completed."
      redirect_to root_path
    end
  end

  # will change
  def private_chat_params
    params.require(:private_chat).permit(:user_id) # arr of users
  end
end
