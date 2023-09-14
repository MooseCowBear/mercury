class ChatChannel < ApplicationCable::Channel
  # testing for notifications...

  def subscribed
    puts "SUBSCRIBING TO CHAT CHANNEL"
    pp current_user
    stream_from "chat_#{params[:room_id]}"
    current_user.update(current_room_id: params[:room_id])
    pp current_user
  end

  def unsubscribed
    puts "UNSUBSCRIBING FROM CHAT CHANNEL"
    pp current_user
    current_user.update(current_room_id: nil)
    # Any cleanup needed when channel is unsubscribed
  end
end
