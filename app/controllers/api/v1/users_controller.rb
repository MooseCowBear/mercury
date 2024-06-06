class Api::V1::UsersController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_chat, only: [:update]
  
  def show
    render json: current_user
  end

  def index
    users = User.existing.other_users(current_user).ordered_by_username
    render json: users
  end

  def update
    if @chat.participant?(current_user) 
      current_user.update(user_params) 
      render json: current_user
    else
      render json: { message: "Bad Request" }, 
                    status: :unprocessable_entity
    end
  end

  private 

  def user_params
    params.require(:user).permit(:id, :current_chat_id)
  end

  def set_chat
    @chat = Chat.find(user_params[:current_chat_id])
  end
end
