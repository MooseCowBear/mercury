require 'rails_helper'

#UPDATE THIS
RSpec.describe Message, type: :model do
  it "is valid when it has a body, a chat, a user" do
    user = create(:user)
    chat = create(:chat, :public)
    message = build(:message, chat: chat, user: user)
    expect(message).to be_valid
  end

  it "has a body" do
    message = build(:message, body: "")
    expect(message).not_to be_valid
  end

  it "has a body less than 1000 characters" do
    message = build(:message, body: "a" * 1001)
    expect(message).not_to be_valid
  end

  describe ".visible_messages" do
    before(:each) do
      @user = create(:user)
      @chat = create(:chat, :public)
      @message1 = create(:message, chat: @chat, user: @user)
      @message2 = create(:old_message, chat: @chat, user: @user)
    end

    it "includes messages that are newer than date" do
      expect(Message.visible_messages(2.days.ago)).to include(@message1)
    end

    it "excludes messages older than date" do
      expect(Message.visible_messages(2.days.ago)).not_to include(@message2)
    end
  end

  describe "#notification_recipients" do
    before(:each) do
      @user1 = create(:user)
    end

    it "returns users of chat not currently in chat" do
      private_chat = create(:chat, :private)
      user2 = create(:user, email: "howard@fake.com", username: "howard")
      user3 = create(:user, email: "betty@fake.com", username: "betty")
      message = create(:message, chat: private_chat, user: @user1)
      allow(message).to receive_message_chain(:chat, :active_users, :outside_chat).and_return ([user2])
      expect(message.notification_recipients).to match_array([user2])
    end
  end
end
