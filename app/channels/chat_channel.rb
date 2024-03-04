class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:chat_id]}"
    current_user.update(current_chat_id: params[:chat_id])
  end

  def unsubscribed
    current_user.update(current_chat_id: nil)
  end
end
