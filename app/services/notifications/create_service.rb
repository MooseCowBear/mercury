class Notifications::CreateService < ApplicationService
  # notifications should be created for all the chat participants not currently
  # in the chat when a new message for the chat is created. 
  # this service handles the creation. the broadcast of the notification count 
  # (the frontend only cares about the count not the actual notifications)
  # gets included in the message broadcast service
  def initialize(message)
    @message = message
  end

  def call 
    notify
  end

  private

  def notify
    @message.notification_recipients.each do |recipient|
      recipient.notifications.create(user_id: recipient.id, message_id: @message.id, chat_id: @message.chat.id)
    end
  end 
end