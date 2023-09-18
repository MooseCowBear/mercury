class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room, touch: true

  validates_presence_of :body 
  validates :body, length: { maximum: 1000 }

  after_commit :broadcast_message, on: [:create, :update]
  after_create_commit :create_notification

  # the messages that someone would see in a private room
  scope :active_messages, 
    ->(datetime) { where("created_at > ?", datetime).order(created_at: :asc) }

  def recipient
    return nil unless room.is_private
    if user != room.interlocutor_one
      room.interlocutor_one
    else
      room.interlocutor_two
    end
  end

  private 

  def broadcast_message
    ActionCable.server.broadcast(
      "chat_#{self.room_id}", 
      self.as_json(include: :user)
    )
  end

  def create_notification
    unless recipient.nil? || recipient.current_room == room
      room.notifications.create(user_id: recipient.id)
    end
  end
end
