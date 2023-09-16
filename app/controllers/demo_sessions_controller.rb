class DemoSessionsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :set_user

  def create
    sign_in(@user)
    redirect_to chat_path
  end

  private 

  def set_user
    unless params[:user_id].to_i == 1 || params[:user_id].to_i == 2
      redirect_to root_path
    end
    @user = User.find(params[:user_id])
  end
end
