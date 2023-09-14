class Api::V1::NotificationsController < ApplicationController
  def index
    notifications = Notification.for_user(current_user)
    render json: notifications
  end
end
