require 'rails_helper'

RSpec.describe Message, type: :model do
  it "is valid when it has a body, a room, a user" do
    user = create(:user)
    room = create(:room)
    message = build(:message, room: room, user: user)
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

  describe ".active_messages" do
    before(:each) do
      @user = create(:user)
      @room = create(:room)
      @message1 = create(:message, room: @room, user: @user)
      @message2 = create(:old_message, room: @room, user: @user)
    end

    it "includes messages that are newer than date" do
      expect(Message.active_messages(2.days.ago)).to include(@message1)
    end

    it "excludes messages older than date" do
      expect(Message.active_messages(2.days.ago)).not_to include(@message2)
    end
  end

  describe "#recipient" do
    before(:each) do
      @user1 = create(:user)
    end

    it "returns nil if room is public" do
      room = create(:room)
      message = create(:message, room: room, user: @user1)
      expect(message.recipient).to be_nil
    end

    it "returns interlocutor two if message user is interlocutor one" do
      user2 = create(:user, username: "harry", email: "harry@test.com")
      room = create(
        :room, 
        is_private: true, 
        interlocutor_one: @user1, 
        interlocutor_two: user2
      )
      message = create(:message, room: room, user: @user1)
      expect(message.recipient).to be(user2)
    end

    it "returns interlocutor one if message user is interlocutor two" do
      user2 = create(:user, username: "harry", email: "harry@test.com")
      room = create(
        :room, 
        is_private: true, 
        interlocutor_one: user2, 
        interlocutor_two: @user1
      )
      message = create(:message, room: room, user: @user1)
      expect(message.recipient).to be(user2)
    end
  end
end
