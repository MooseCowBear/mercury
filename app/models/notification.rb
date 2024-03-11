class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :chat
  belongs_to :message

  scope :for_user, ->(user) { where(user: user) }
  scope :for_chat, ->(chat) { where(chat: chat) }
end
