class UsersChannel < ApplicationCable::Channel
  def subscribed
    puts "SUBSCRIBING TO USERS CHANNEL"
    stream_from "user_#{params[:user_id]}"
  end

  def unsubscribed
    puts "UNSUBSCRIBING FROM USERS CHANNEL"
    # Any cleanup needed when channel is unsubscribed
  end
end
