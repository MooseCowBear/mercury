class Api::V1::NotificationsController < ApplicationController
  def index
    notifications = Notification.for_user(current_user)
    pp notifications
    render json: notifications
  end
end
