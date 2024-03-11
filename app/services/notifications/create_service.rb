class Notifications::CreateService < ApplicationService
  def initialize(message)
    @message = message
  end

  def call 
    pp "CALLING NOTIFY"
    notify
  end

  private

  def notify
    @message.notification_recipients.each do |recipient|
      recipient.notifications.create(user_id: recipient.id, message_id: @message.id, chat_id: @message.chat.id)
    end
  end 
end