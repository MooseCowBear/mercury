class HomepageController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
  end

  def chat
    puts "IN CHAT CONTROLLER"
  end
end
