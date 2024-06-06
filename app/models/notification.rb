class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :chat
  belongs_to :message
end
