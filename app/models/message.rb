class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates_presence_of :body # length ? 

  after_create_commit :broadcast_message
  after_create_commit :create_notification

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
    ActionCable.server.broadcast("chat_#{self.room_id}", self.as_json(include: :user))
  end

  def create_notification
    unless recipient.nil? || recipient.current_room == room
      room.notifications.create(user_id: recipient.id)
    end
  end
end
