class Notifications::CreateService < ApplicationService
  # when a message is created, want two other sets of records to be created
  # notifications for the messsage and private_message_recipient records
  # notifications tell users who belong to a private chat but are outside it 
  # at the time that a new message has been sent
  # private_message_recipient records keep track of which chat members should receive
  # a particular message, allowing for blocking and unblocking of chats to work
  # as expected -- users who have a chat blocked will not receive a message sent during
  # the time when the chat was blocked
  
  def initialize(message)
    @message = message
  end

  def call 
    create_notifications
    create_message_recipients
  end

  private

  def create_notifications
    @message.notification_recipients.each do |recipient|
      recipient.notifications.create(user_id: recipient.id, message_id: @message.id, chat_id: @message.chat.id)
    end
  end

  def create_message_recipients
    @message.message_recipients.each do |recipient|
      recipient.private_message_recipients.create(user_id: recipient.id, message_id: @message.id)
    end
  end
end