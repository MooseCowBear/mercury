class Message < ApplicationRecord
  after_destroy :delete_from_cloudinary

  belongs_to :user
  belongs_to :chat, touch: true # for determining whether a chat is still active

  has_many :notifications, dependent: :destroy
  has_many :private_message_recipients, dependent: :destroy

  # messages for which there is a record for the user, most recent is last (all chats)
  scope :private_messages_for, ->(user) { joins(:private_message_recipients).where("private_message_recipients.user_id = ?", user.id).order(created_at: :asc) }

  validates :body, length: { maximum: 1000 }
  validate :has_content

  delegate :is_private, to: :chat

  def notification_recipients 
    message_recipients.outside_chat(chat)
  end

  def message_recipients
    chat.active_users
  end

  private

  def has_content
    if self.body.blank? && self.image.blank?
      errors.add(:message, "must have content")
    end
  end

  def delete_from_cloudinary
    return unless public_id # only image messages have public ids
    Cloudinary::Uploader.destroy(@message.public_id)
  end
end
