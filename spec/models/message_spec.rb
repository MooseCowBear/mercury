require 'rails_helper'

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

  describe ".messages_after" do
    before(:each) do
      @user = create(:user)
      @chat = create(:chat, :public)
      @message1 = create(:message, chat: @chat, user: @user)
      @message2 = create(:old_message, chat: @chat, user: @user)
    end

    it "includes messages that are newer than date" do
      expect(Message.messages_after(2.days.ago)).to include(@message1)
    end

    it "excludes messages older than date" do
      expect(Message.messages_after(2.days.ago)).not_to include(@message2)
    end
  end

  describe "#notification_recipients" do
    it "returns users of chat not currently in chat" do
      private_chat = create(:chat, :private)
      user1 = create(:user)
      user2 = create(:user)
      user3 = create(:user)
      message = create(:message, chat: private_chat, user: user1)
      allow(message).to receive_message_chain(:chat, :active_users, :outside_chat).and_return ([user2])
      expect(message.notification_recipients).to match_array([user2])
    end
  end

  describe "#message_recipients" do
    it "returns active users in chat" do
      private_chat = create(:chat, :private)
      user1 = create(:user)
      user2 = create(:user)
      user3 = create(:user)
      message = create(:message, chat: private_chat, user: user1)
      allow(message).to receive_message_chain(:chat, :active_users).and_return ([user2])
      expect(message.message_recipients).to match_array([user2])
    end
  end

  describe "#is_private" do
    before(:each) do
      user = create(:user)
      private_chat = create(:chat, :private)
      public_chat = create(:chat, :public)
      @private_message = create(:message, chat: private_chat, user: user)
      @public_message = create(:message, chat: public_chat, user: user)
    end

    it "returns true if chat message belongs to is private" do
      expect(@private_message.is_private).to be true
    end

    it "returns false if chat message belongs to is not private" do
      expect(@public_message.is_private).to be false
    end
  end
end
