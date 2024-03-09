class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{current_user.current_chat_id}"
  end

  def unsubscribed
  end
end
