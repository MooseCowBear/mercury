class Message < ApplicationRecord
  after_destroy :delete_from_cloudinary

  belongs_to :user
  belongs_to :chat, touch: true

  has_one :notification, dependent: :destroy
  has_many :private_message_recipients, dependent: :destroy

  validates :body, length: { maximum: 1000 }
  validate :has_content

  # the messages that someone would see in a private chat - if they had deleted the chat at some point
  scope :messages_after, 
    ->(datetime) { where("created_at > ?", datetime).order(created_at: :asc) }

  delegate :is_private, to: :chat

  def notification_recipients 
    chat.active_users.outside_chat(chat)
  end

  # Who gets a private message recipient record? chat.active_users (including those inside the chat!)
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
