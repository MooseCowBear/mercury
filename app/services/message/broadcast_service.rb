class Message::BroadcastService < ApplicationService
  # broadcasting to the 2 chats channels happens after a message is created.
  # this is used to update the frontend message previews and (if private) 
  # the notifications count.
  # broadcasting to particular chat channel happens when a new message has been 
  # created or when a message has been updated
  def initialize(message)
    @message = message
  end

  def call 
    if @message.updated_at == @message.created_at
      broadcast_new_message
    else
      broadcast_updated_message
    end
  end

  private 

  def broadcast_new_message
    if @message.is_private
      broadcast_private
    else
      broadcast_public
    end
    broadcast_message
  end

  def broadcast_updated_message
    broadcast_message
  end

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

  def broadcast_message
    ActionCable.server.broadcast(
      "chat_#{@message.chat_id}",
      @message.as_json(include: :user)
    )
  end
end