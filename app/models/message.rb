class Message < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :room, dependent: :destroy

  validates_presence_of :body # length ? 

  after_create_commit :broadcast_message

  def recipient
    return nil unless room.is_private
    if user != room.interlocutor_one
      user
    else
      room.interlocutor_one
    end
  end

  private 

  def broadcast_message
    ActionCable.server.broadcast("chat_#{self.room_id}", self.as_json(include: :user))
  end
end
