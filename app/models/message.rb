class Message < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :room, dependent: :destroy

  validates_presence_of :body # length ? 

  after_create_commit :broadcast_message

  private 

  def broadcast_message
    ActionCable.server.broadcast("chat_#{self.room_id}", self.as_json(include: :user))
  end
end
