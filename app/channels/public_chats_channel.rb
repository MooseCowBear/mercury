class PublicChatsChannel < ApplicationCable::Channel
  # channel for receiving newly created public rooms
  def subscribed
    stream_from "PublicChatsChannel"
  end

  def unsubscribed
  end
end
