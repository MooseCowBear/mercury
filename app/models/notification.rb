class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :chat
  belongs_to :message

  scope :for_user, ->(user) { where(user: user) }
  scope :for_chat, ->(chat) { where(chat: chat) }

  after_commit :broadcast_notification, on: [:create, :destroy]

  private 

  def broadcast_notification
    ActionCable.server.broadcast("notification_#{self.user_id}", self)
  end
end
