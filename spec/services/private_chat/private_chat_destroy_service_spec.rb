require 'rails_helper'

RSpec.describe PrivateChatDestroyService, type: :service do
  describe "self.call" do
    before(:each) do
      @user1 = create(:user)
      @user2 = create(:user, username: "user two", email: "two@fake.com")
      @destroyable_chat = create(:chat, :private)
      create(:chat_participant, user: @user1, chat: @destroyable_chat)
      @nondestroyable_chat = create(:chat, :private)
      create(:chat_participant, user: @user1, chat: @nondestroyable_chat)
      create(:chat_participant, user: @user2, chat: @nondestroyable_chat)
    end

    it "only destroys chats where user was only participant" do
      PrivateChatDestroyService.call(@user1)
      expect { Chat.find(@destroyable_chat.id) }.to raise_exception(ActiveRecord::RecordNotFound)
      expect { Chat.find(@nondestroyable_chat.id) }.not_to raise_error
    end
  end
end