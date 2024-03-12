class PrivateChatsChannel < ApplicationCable::Channel
  # subscription for private chats that belong to user, 
  # updates when a new message/notification is created for user
  def subscribed
    stream_from "private_chat_for_#{params[:user_id]}"
  end

  def unsubscribed
  end
end
