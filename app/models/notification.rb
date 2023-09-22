class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :room
  belongs_to :message

  scope :for_user, ->(user) { where(user: user) }
  scope :for_room, ->(room) { where(room: room) }

  after_commit :broadcast_notification, on: [:create, :destroy]

  private 

  def broadcast_notification
    ActionCable.server.broadcast("notification_#{self.user_id}", self)
  end
end
