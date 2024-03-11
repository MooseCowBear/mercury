class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat, touch: true

  has_one :notification, dependent: :destroy

  validates :body, length: { maximum: 1000 }
  validate :has_content

  after_commit :broadcast_message, on: [:create, :update]

  # the messages that someone would see in a private chat - if they had deleted the chat at some point
  scope :visible_messages, 
    ->(datetime) { where("created_at > ?", datetime).order(created_at: :asc) }

  def notification_recipients
    # public chats have no chat participants
    # everyone accepting notifications in a private chat not currently in the room should be notified when a new message is sent
    # active users are receiving notifications
    chat.active_users.outside_chat(chat)
  end

  private

  def broadcast_message
    ActionCable.server.broadcast(
      "chat_#{chat_id}",
      as_json(include: :user)
    )
  end

  def has_content
    if self.body.blank? && self.image.blank?
      errors.add(:message, "must have content")
    end
  end
end
