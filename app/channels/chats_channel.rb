class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ChatsChannel"
  end

  def unsubscribed
  end
end
