require 'rails_helper'

RSpec.describe Message::BroadcastService, type: :service do
  context "public chat" do
    before(:each) do
      @public_chat = create(:chat, :public)
    end

    context "new message" do
      before(:each) do
        @new_message = create(:message, chat: @public_chat)
      end

      it "broadcasts to public chats channel" do
        expect { Message::BroadcastService.call(@new_message) }.to have_broadcasted_to("PublicChatsChannel")
      end

      it "broadcasts to chat channel" do
        expect { Message::BroadcastService.call(@new_message) }.to have_broadcasted_to("chat_#{@new_message.chat_id}")
      end
    end

    context "updated message" do
      it "broadcasts to chat channel" do
        updated_message = create(:message, chat: @public_chat, created_at: 2.days.ago, updated_at: Time.now)
        expect { Message::BroadcastService.call(updated_message) }.to have_broadcasted_to("chat_#{updated_message.chat_id}")
      end
    end
  end

  context "private chat" do
    before(:each) do
      @private_chat = create(:chat, :private)
    end

    context "new messsage" do
      before(:each) do
        @new_message = create(:message, chat: @private_chat)
        @user1 = create(:user)
        @user2 = create(:user)
      end

      it "broadcasts to private chat channel for each notification recipient" do
        allow(@new_message).to receive(:notification_recipients).and_return([@user1, @user2])
        expect { Message::BroadcastService.call(@new_message) }.to have_broadcasted_to("private_chat_for_#{@user1.id}")
        expect { Message::BroadcastService.call(@new_message) }.to have_broadcasted_to("private_chat_for_#{@user2.id}")
      end

      it "broadcasts to chat channel" do
        allow(@new_message).to receive(:notification_recipients).and_return([@user1, @user2])
        expect { Message::BroadcastService.call(@new_message) }.to have_broadcasted_to("chat_#{@new_message.chat_id}")
      end
    end

    context "updated message" do
      it "broadcasts to chat channel" do
        updated_message = create(:message, chat: @private_chat, created_at: 2.days.ago, updated_at: Time.now)
        expect { Message::BroadcastService.call(updated_message) }.to have_broadcasted_to("chat_#{updated_message.chat_id}")
      end
    end
  end
end