class Notification < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :room, dependent: :destroy

  scope :for_user, ->(user) { where(user: user) }
  scope :for_room, ->(room) { where(room: room) }

  after_create_commit :broadcast_notification

  private 

  def broadcast_notification
    puts "BROADCASTING NOTIFICATION"
    pp self
    ActionCable.server.broadcast("notification_#{self.user_id}", self)
  end
end
