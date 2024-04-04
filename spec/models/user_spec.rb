require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    user = create(:user)
    expect(user).to be_valid
  end

  it "has a unique username" do
    user = create(:user, username: "larry")
    user2 = build(:user, username: "larry", email: "larry@test.com")
    expect(user2).to_not be_valid
  end

  it "has a username" do
    user2 = build(:user, email: "randy@test.com", username: "")
    expect(user2).to_not be_valid
  end

  it "has a username less than 21 characters" do
    user2 = build(:user, email: "sally@test.com", username: "a" * 21)
    expect(user2).to_not be_valid
  end

  it "strips username of whitespace" do
    user2 = create(:user, email: "zoe@test.com", username: "  zoe  ")
    expect(user2.username).to eq("zoe")
  end

  it "lowercases username" do
    user2 = create(:user, email: "howie@test.com", username: "HOWIE")
    expect(user2.username).to eq("howie")
  end

  describe ".existing" do
    before(:each) do
      @user1 = create(:user)
      @user2 = create(:user, :deleted)
    end

    it "includes users where deleted is false" do
      expect(User.existing).to include(@user1)
    end

    it "excludes users where deleted is true" do
      expect(User.existing).not_to include(@user2)
    end
  end

  describe ".other_users" do
    before(:each) do
      @user1 = create(:user)
      @user2 = create(:user)
    end

    it "excludes user" do
      expect(User.other_users(@user1)).not_to include(@user1)
    end

    it "includes all other users" do
      expect(User.other_users(@user1)).to include(@user2)
    end
  end

  describe ".outside_chat" do
    it "returns users not currently in chat" do
      chat = create(:chat, :public)
      user_outside_chat = create(:user)
      user_in_chat = create(:user, current_chat_id: chat.id)
      outside_users = User.outside_chat(chat)
      expect(outside_users.include?(user_outside_chat)).to be true
      expect(outside_users.include?(user_in_chat)).to be false
    end
  end

  describe ".ordered_by_username" do
    it "returns users in alphabetical order" do 
      user = create(:user, username: "a")
      user2 = create(:user, username: "b")
      ordered = User.ordered_by_username
      expect(ordered.first).to eq user
      expect(ordered.last).to eq user2
    end
  end

  describe "#private_chat_messages" do
    it "returns the messages for user had through private_message_recipient records" do
      user = create(:user)
      included_message = create(:message)
      create(:private_message_recipient, user: user, message: included_message)
      excluded_message = create(:message)
      res = user.private_chat_messages(included_message.chat)
      expect(res.length).to eq 1
      expect(res.include?(included_message)).to be true
    end
  end

  describe "#as_json" do
    before(:each) do
      @user = create(:user)
    end

    it "includes field for current chat silenced if current chat" do
      chat = create(:chat, :public)
      @user.update(current_chat_id: chat.id)
      @user.reload
      expect(@user.as_json).to have_key(:current_chat_silenced)
    end

    it "includes current chat field" do
      expect(@user.as_json).to have_key(:current_chat)
    end
  end
end
