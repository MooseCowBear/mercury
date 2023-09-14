class Notification < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :room, dependent: :destroy

  scope :for_user, ->(user) { where(user: user) }
  scope :for_room, ->(room) { where(room: room) }

  after_create_commit :broadcast_notification

  private 

  def broadcast_notification
    # notifications_count = Notification.for_user(self.user).for_room(self.room).length
    # pp "NOTIFICATIONS COUNT with ROOM"
    # response = { "room": self.room_id, "count": notifications_count }
    # pp response
    # ActionCable.server.broadcast("notification_#{self.user_id}", response )

    puts "BROADCASTING NOTIFICATION"
    pp self
    ActionCable.server.broadcast("notification_#{self.user_id}", self)
  end
end
