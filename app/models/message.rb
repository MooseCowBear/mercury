class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat, touch: true

  has_one :notification, dependent: :destroy

  validates :body, length: { maximum: 1000 }
  validate :has_content

  # the messages that someone would see in a private chat - if they had deleted the chat at some point
  scope :visible_messages, 
    ->(datetime) { where("created_at > ?", datetime).order(created_at: :asc) }

  def notification_recipients
    chat.active_users.outside_chat(chat)
  end

  def is_private
    chat.is_private
  end

  private

  def has_content
    if self.body.blank? && self.image.blank?
      errors.add(:message, "must have content")
    end
  end
end
