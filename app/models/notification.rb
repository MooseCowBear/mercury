class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :room
  belongs_to :message

  # needs to belong to message

  scope :for_user, ->(user) { where(user: user) }
  scope :for_room, ->(room) { where(room: room) }

  # after_create_commit :broadcast_notification
  after_commit :broadcast_notification, on: [:create, :destroy]

  # needs an after delete! broadcast it!!

  private 

  def broadcast_notification
    ActionCable.server.broadcast("notification_#{self.user_id}", self)
  end
end
