class Message::BroadcastService < ApplicationService
  # after a message is created for a private chat
  # we need to broadcast the update for each chat participant

  def initialize(message)
    @message = message
  end

  def call 
    if @message.is_private
      broadcast_private
    else
      broadcast_public
    end
  end

  private 

  def broadcast_private
    @message.notification_recipients.each do |user|
      ActionCable.server.broadcast(
        "private_chat_for_#{user.id}", 
        @message.chat.to_json({ user: user })
      )
    end
  end

  def broadcast_public
    ActionCable.server.broadcast(
      "PublicChatsChannel", 
      @message.chat.to_json({ last_message: @message })
    )
  end
end