class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat, touch: true

  has_one :notification, dependent: :destroy

  validates :body, length: { maximum: 1000 }
  validate :has_content

  after_commit :broadcast_message, on: [:create, :update]
  after_create_commit :create_notification

  # the messages that someone would see in a private chat
  scope :active_messages, 
    ->(datetime) { where("created_at > ?", datetime).order(created_at: :asc) }

  # will change..
  def recipient
  end

  private 

  def broadcast_message
    ActionCable.server.broadcast(
      "chat_#{self.chat_id}", 
      self.as_json(include: :user)
    )
  end

  # will change
  def create_notification
    unless recipient.nil? || recipient.current_chat == chat
      chat.notifications.create(user_id: recipient.id, message_id: self.id)
    end
  end

  def has_content
    if self.body.blank? && self.image.blank?
      errors.add(:message, "must have content")
    end
  end
end
