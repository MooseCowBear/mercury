class PrivateChat::BroadcastService < ApplicationService
  # after a message is created for a private chat
  # we need to broadcast the update for each chat participant

  def initialize(message)
    @message = message
  end

  def call 
    @message.notification_recipients.each do |user|
      ActionCable.server.broadcast(
        "private_chat_#{user.id}", 
        @message.chat.to_json({user: user})
      )
    end
  end
end