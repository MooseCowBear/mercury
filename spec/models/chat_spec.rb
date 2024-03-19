require 'rails_helper'

RSpec.describe Chat, type: :model do
  before(:each) do
    @chat1 = create(:chat, :public, name: "public chat")
  end

  it "is valid with valid attributes" do
    expect(@chat1).to be_valid
  end

  it "has a name" do
    chat2 = build(:chat, :public, name: "")
    expect(chat2).not_to be_valid
  end

  it "has a unique name if public" do
    chat2 = build(:chat, :public, name: "public chat")
    expect(chat2).not_to be_valid
  end

  it "has a unique name if private" do
    private_chat1 = create(:chat, :private, name: "private chat")
    private_chat2 = build(:chat, :private, name: "private chat")
    expect(private_chat2).not_to be_valid
  end

  it "public chat has a name 45 characters or less" do
    chat2 = build(:chat, name: "a" * 46)
    expect(chat2).not_to be_valid
  end

  it "allows private chat to have name more than 45 characters" do
    chat2 = build(:chat, :private, name: "a" * 46)
    expect(chat2).to be_valid
  end

  it "strips white space from name" do 
    chat2 = create(:chat, name: "   test   ");
    expect(chat2.name).to eq("test")
  end

  it "lowercases name" do
    chat2 = create(:chat, name: "TEST");
    expect(chat2.name).to eq("test")
  end

  describe ".public_chats" do
    before(:each) do
      @chat2 = create(:chat, :private, name: "private chat test name")
    end

    it "includes public chats" do
      expect(Chat.public_chats).to include(@chat1)
    end

    it "excludes private chats" do
      expect(Chat.public_chats).not_to include(@chat2)
    end
  end

  describe ".active" do
    before(:each) do
      @old = create(:old_chat)
      @new = create(:new_chat)
    end

    it "does not include chats last updated over a week ago" do
      expect(Chat.active).not_to include(@old)
    end

    it "includes public chats updated in last week" do
      expect(Chat.active).to include(@new)
    end
  end

  describe ".with_participants" do
    it "returns chats with exactly participants provided and no more" do
      user1 = create(:user)
      user2 = create(:user)
      user3 = create(:user)
      chat_with_participants = create(:chat, :private)
      create(:chat_participant, user: user1, chat: chat_with_participants)
      create(:chat_participant, user: user2, chat: chat_with_participants)
      chat_with_additional_participants = create(:chat, :private)
      create(:chat_participant, user: user1, chat: chat_with_additional_participants)
      create(:chat_participant, user: user2, chat: chat_with_additional_participants)
      create(:chat_participant, user: user3, chat: chat_with_additional_participants)

      res = Chat.with_participants([user1.id, user2.id])
      expect(res.include?(chat_with_participants)).to be true
      expect(res.include?(chat_with_additional_participants)).to be false
    end
  end

  describe "#participant?" do
    before(:each) do
      @user1 = create(:user)
    end

    it "returns true if chat is public" do
      expect(@chat1.participant?(@user1)).to be true
    end

    it "returns true if user is in active chat users" do
      private_chat = create(:chat, :private)
      allow(private_chat).to receive_message_chain(:active_users, :exists?).and_return(true)
      expect(private_chat.participant?(@user1)).to be true
    end

    it "returns false if user not in active chat users" do
      private_chat = create(:chat, :private)
      allow(private_chat).to receive_message_chain(:active_users, :exists?).and_return(false)
      expect(private_chat.participant?(@user1)).to be false
    end
  end

  describe "#chat_messages" do
    before(:each) do
      @user1 = create(:user)
    end

    it "returns all messages for a public chat" do
      message = create(:message, chat: @chat1, user: @user1)
      expect(@chat1.chat_messages(@user1)).to include(message)
    end

    it "returns user's messages for which there is a private message recipient record" do
      private_chat = create(:chat, :private)
      mocked_result = [double()]
      allow(@user1).to receive(:private_chat_messages).with(private_chat).and_return(mocked_result)
      expect(private_chat.chat_messages(@user1)).to eq mocked_result
    end
  end

  describe "#last_message" do
    before(:each) do
      @user = create(:user)
    end

    it "returns the last message by created at for chat" do
      message1 = create(:message, chat: @chat1, user: @user, body: "first message", created_at: 2.days.ago)
      message2 = create(:message, chat: @chat1, user: @user, body: "second message")

      expect(@chat1.last_message).to eq message2
    end

    it "returns nil if chat has no messages" do
      expect(@chat1.last_message).to be nil
    end
  end

  describe "#last_private_message" do
    before(:each) do
      @user = create(:user)
    end

    it "returns the most recently sent message for chat and for which user has a private message recipient record" do
      private_chat = create(:chat, :private)
      first_message = create(:message, chat: private_chat, created_at: 5.days.ago)
      create(:private_message_recipient, message: first_message, user: @user)
      second_message = create(:message, chat: private_chat, created_at: 1.day.ago)
      create(:private_message_recipient, message: second_message, user: @user)
      expect(private_chat.last_private_message(@user)).to eq second_message
    end

    it "returns nil if chat has no message for user with private message recipient record" do
      private_chat = create(:chat, :private)
      expect(private_chat.last_private_message(@user)).to eq nil
    end

    it "does not include messages for which there is no private message recipient record" do
      other_user = create(:user)
      private_chat = create(:chat, :private)
      first_message = create(:message, chat: private_chat, created_at: 5.days.ago)
      create(:private_message_recipient, message: first_message, user: other_user)
      expect(private_chat.last_private_message(@user)).to eq nil
    end
  end

  describe "#notification_count" do
    before(:each) do
      @user = create(:user, email: "one@test.com", username: "one")
      user2 = create(:user, email: "two@test.com", username: "two")
      @chat = create(:chat, :private, name: "private chat")
      chat2 = create(:chat, :private, name: "other private chat")
      message = create(:message, user: user2, chat: chat2) # not sure why it didn't like letting the factory create this
      notification1 = create(:notification, user: @user, chat: @chat, message: message)
      notification2 = create(:notification, user: user2, chat: @chat, message: message)
      notification3 = create(:notification, user: @user, chat: chat2, message: message)
    end

    it "returns number of notifications for chat and user" do
      expect(@chat.notification_count(@user)).to eq 1
    end
  end

  describe "#as_json" do
    before(:each) do
      @user = create(:user)
    end

    it "includes last message field for public chat" do
      public_chat = create(:chat, :public)
      expect(public_chat.as_json).to have_key(:last_message)
    end

    it "includes last message field for private chat" do
      private_chat = create(:chat, :private)
      expect(private_chat.as_json({ user: @user })).to have_key(:last_message)
    end

    it "includes notification count field if chat is private" do
      private_chat = create(:chat, :private)
      expect(private_chat.as_json({ user: @user })).to have_key(:notification_count)
    end
  end
end
