require 'rails_helper'

RSpec.describe Notification, type: :model do
  describe ".for_user" do
    before(:each) do
      @user1 = create(:user)
      @user2 = create(:user, username: "frank", email: "frank@test.com")
      room = create(:room)
      message1 = create(:message, room: room, user: @user2)
      message2 = create(:message, room: room, user: @user1)
      @notification1 = create(:notification, room: room, user: @user1, message: message1)
      @notification2 = create(:notification, room: room, user: @user2, message: message2)
    end

    it "includes notifications belonging to user" do
      expect(Notification.for_user(@user1)).to include(@notification1)
    end

    it "excludes notifications not belonging to user" do
      expect(Notification.for_user(@user1)).not_to include(@notification2)
    end
  end

  describe ".for_room" do
    before(:each) do
      @user1 = create(:user)
      @room1 = create(:room)
      @room2 = create(:room, name: "other room")
      user2 = create(:user, username: "frank", email: "frank@test.com")
      message1 = create(:message, room: @room1, user: user2)
      message2 = create(:message, room: @room2, user: user2)
      @notification1 = create(:notification, room: @room1, user: @user1, message: message1)
      @notification2 = create(:notification, room: @room2, user: @user1, message: message2)
    end

    it "includes notifications belonging to room" do
      expect(Notification.for_room(@room1)).to include(@notification1)
    end

    it "excludes notifications not belonging to room" do
      expect(Notification.for_room(@room2)).not_to include(@notification1)
    end
  end
end
