class Api::V1::UsersController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  
  def show
    render json: current_user
  end

  def index
    users = User.other_users(current_user).ordered_by_username
    render json: users
  end
end
