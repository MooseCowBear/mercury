class DemoSessionsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :set_user

  def create
    sign_in(@user)
    redirect_to chat_path
  end

  private 

  def set_user
    unless params[:email] == "alice@fake.com"|| params[:email] == "bob@fake.com"
      redirect_to root_path
    end
    @user = User.find_by(email: params[:email])
  end
end
