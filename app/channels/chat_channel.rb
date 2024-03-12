class ChatChannel < ApplicationCable::Channel
  # subscription for current chat, for broadcasting messages
  def subscribed
    stream_from "chat_#{params[:chat_id]}"
  end

  def unsubscribed
  end
end
