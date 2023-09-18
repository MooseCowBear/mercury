class HomepageController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
  end

  def chat
    current_user.update_last_active
  end
end
