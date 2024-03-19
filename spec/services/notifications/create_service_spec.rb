require 'rails_helper'

RSpec.describe Notifications::CreateService, type: :service do
  before(:each) do
    @user = create(:user)
    @user2 = create(:user)
    @message = create(:message)
  end

  describe "self.call" do
    it "creates a notification for each notification recipient of message" do
      allow(@message).to receive(:notification_recipients).and_return([@user, @user2])
      allow(@message).to receive(:message_recipients).and_return([@user, @user2])

      Notifications::CreateService.call(@message)
      notifications = Notification.all
      expect(notifications.length).to be 2
      notification_for_user = Notification.find_by(user: @user)
      expect(notification_for_user.chat.id).to eq @message.chat.id
      expect(notification_for_user.message.id).to eq @message.id
      notification_for_user2 = Notification.find_by(user: @user2)
      expect(notification_for_user2.chat.id).to eq @message.chat.id
      expect(notification_for_user2.message.id).to eq @message.id

      message_recipients = PrivateMessageRecipient.all 
      expect(message_recipients.length).to be 2
      message_recipient_for_user = PrivateMessageRecipient.find_by(user: @user)
      expect(message_recipient_for_user.message.id).to eq @message.id
      message_recipient_for_user2 = PrivateMessageRecipient.find_by(user: @user2)
      expect(message_recipient_for_user2.message.id).to eq @message.id
    end
  end
end

# update after rename