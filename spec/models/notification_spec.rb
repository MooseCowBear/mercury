require 'rails_helper'

#UPDATE THIS
RSpec.describe Notification, type: :model do
  describe ".for_user" do
    before(:each) do
      @user1 = create(:user)
      @user2 = create(:user, username: "frank", email: "frank@test.com")
      chat = create(:chat, :private)
      message1 = create(:message, chat: chat, user: @user2)
      message2 = create(:message, chat: chat, user: @user1)
      @notification1 = create(:notification, chat: chat, user: @user1, message: message1)
      @notification2 = create(:notification, chat: chat, user: @user2, message: message2)
    end

    it "includes notifications belonging to user" do
      expect(Notification.for_user(@user1)).to include(@notification1)
    end

    it "excludes notifications not belonging to user" do
      expect(Notification.for_user(@user1)).not_to include(@notification2)
    end
  end

  describe ".for_chat" do
    before(:each) do
      @user1 = create(:user)
      @chat1 = create(:chat, :private)
      @chat2 = create(:chat, :private)
      user2 = create(:user, username: "frank", email: "frank@test.com")
      message1 = create(:message, chat: @chat1, user: user2)
      message2 = create(:message, chat: @chat2, user: user2)
      @notification1 = create(:notification, chat: @chat1, user: @user1, message: message1)
      @notification2 = create(:notification, chat: @chat2, user: @user1, message: message2)
    end

    it "includes notifications belonging to chat" do
      expect(Notification.for_chat(@chat1)).to include(@notification1)
    end

    it "excludes notifications not belonging to chat" do
      expect(Notification.for_chat(@chat2)).not_to include(@notification1)
    end
  end
end
