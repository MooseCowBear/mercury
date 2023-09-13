class Api::V1::UsersController < ApplicationController
  def show
    render json: current_user
  end

  def index
    users = User.other_users(current_user).ordered_by_username
    render json: users
  end
end
