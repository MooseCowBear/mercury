require 'rails_helper'

RSpec.describe PublicChat::DestroyService, type: :service do
  describe "self.call" do
    before(:each) do
      @destroyable_chat = create(:old_chat)
      @nondestroyable_chat = create(:new_chat)
    end

    it "only destroys chats where user was only participant" do
      PublicChat::DestroyService.call
      expect { Chat.find(@destroyable_chat.id) }.to raise_exception(ActiveRecord::RecordNotFound)
      expect { Chat.find(@nondestroyable_chat.id) }.not_to raise_error
    end
  end
end