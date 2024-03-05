require 'rails_helper'

# UPDATE THIS
RSpec.describe Chat, type: :model do
  before(:each) do
    @chat1 = create(:chat, :public)
  end

  it "is valid with valid attributes" do
    expect(@chat1).to be_valid
  end

  it "has a name if public" do
    chat2 = build(:chat, :public, name: "")
    expect(chat2).not_to be_valid
  end

  it "has a unigue name" do
    chat2 = build(:chat, :public)
    expect(chat2).not_to be_valid
  end

  it "has a name 45 characters or less" do
    chat2 = build(:chat, name: "a" * 46)
    expect(chat2).not_to be_valid
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
      @chat2 = create(:chat, :private, name: "private chat")
    end

    it "includes public chats" do
      expect(Chat.public_chats).to include(@chat1)
    end

    it "excludes private chats" do
      expect(Chat.public_chats).not_to include(@chat2)
    end
  end

  describe ".user_private_chats" do
    before(:each) do
      @user1 = create(:user)
    end

    # rethink this
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

  describe ".private_destroyable" do
    before(:each) do
      @user1 = create(:user)
    end

   # update
  end

  describe "#participant?" do
    before(:each) do
      @user1 = create(:user)
    end

    # update

    it "returns true if chat is public" do
      expect(@chat1.participant?(@user1)).to be true
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

    # update
  end


  describe "#private_chat_destroy" do
    before(:each) do
      @user1 = create(:user)
    end

    # update
  end
end
