class RoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "RoomsChannel"
  end

  def unsubscribed
  end
end
