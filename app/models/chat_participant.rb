class ChatParticipant < ApplicationRecord
  belongs_to :user
  belongs_to :chat

  validates :user_id, uniqueness: { scope: :chat_id, message: "User is already a chat participant." }
end
