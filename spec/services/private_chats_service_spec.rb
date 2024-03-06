require 'rails_helper'

RSpec.describe PrivateChatCreateService, type: :service do
  describe "#call" do
    before(:each) do
      @user1 = create(:user)
      @user2 = create(:user, username: "user two", email: "two@fake.com")
      @params = {chat_participants_attributes: [{ user_id: @user1.id }, { user_id: @user2.id }]}
    end

    context "chat between users does not exist" do
      it "creates and chat participants" do
        # .previously_new_record? => true
        chat = PrivateChatCreateService.new(@params).call
        expect(chat.previously_new_record?).to be true
      end
    end

    context "chat between users already exists" do
      it "returns existing chat without creating new chat participants" do
        # .previously_new_record? => false
        existing_chat = create(:chat, :private)
        create(:chat_participant, chat: existing_chat, user: @user1)
        create(:chat_participant, chat: existing_chat, user: @user2)
        chat = PrivateChatCreateService.new(@params).call
        expect(chat.previously_new_record?).to be false
      end
    end
  end
end