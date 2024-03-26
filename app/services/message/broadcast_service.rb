class Message::BroadcastService < ApplicationService
  # broadcasting to the 2 chats channels happens after a message is created.
  # this is used to update the frontend message previews and (if private) 
  # the notifications count.
  # broadcasting to particular chat channel happens when a new message has been 
  # created or when a message has been updated
  # users that have blocked/silenced a private chat won't receive the message 
  # bc they will not be subscribed to the chat channel the message is being broadcast to

  # when message is deleted, need to rebroadcast the chat so that the message
  # preview in the sidebar updates (removing the message if it was the last one)
  
  def initialize(message, current_user = nil)
    @message = message
    @current_user = current_user
  end

  def call 
    if @current_user
      broadcast_private_chat([@current_user])
    elsif @message.updated_at == @message.created_at
      broadcast_new_message
    else
      broadcast_updated_message
    end
  end

  private 

  def broadcast_new_message
    if @message.is_private
      broadcast_private_chat(@message.message_recipients)
    else
      broadcast_public_chat
    end
    broadcast_message
  end

  def broadcast_updated_message
    broadcast_message
  end

  def broadcast_private_chat(users)
    users.each do |user|
      ActionCable.server.broadcast(
        "private_chat_for_#{user.id}", 
        @message.chat.to_json({ user: user })
      )
    end
  end

  def broadcast_public_chat
    ActionCable.server.broadcast(
      "PublicChatsChannel", 
      @message.chat.to_json({ last_message: @message })
    )
  end

  def broadcast_message
    ActionCable.server.broadcast(
      "chat_#{@message.chat_id}",
      @message.to_json(include: [:user], methods: [:is_private])
    )
  end
end