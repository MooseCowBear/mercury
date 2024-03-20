class Api::V1::PrivateChatsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:destroy]
  
  def index 
    chats = current_user.chats.has_message.order(updated_at: :desc) # these are the chats had through chat participants
    render json: chats.to_json({user: current_user}) # with custom as_json, that includes notifications count
  end

  def create
    chat = PrivateChat::CreateService.call(private_chat_params, current_user)
    if chat.valid?
      current_user.update(current_chat_id: chat.id) # put the user in the chat they created
      render json: current_user.to_json
    else
      render json: { message: "Something went wrong", 
                    errors: chat.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  # MARK: currently not in use. Need to decide what the behavior of this will be
  def destroy
    @chat.private_chat_destroy(current_user)
    
    render json: @chat
  end

  private

  def set_chat
    @chat = current_user.chats.find(params[:id])
  end

  def private_chat_params
    params.require(:private_chat).permit(chat_participants_attributes: [:user_id])
  end
end
