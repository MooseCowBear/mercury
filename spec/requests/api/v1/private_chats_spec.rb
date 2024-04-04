require 'rails_helper'

RSpec.describe "Api::V1::PrivateChats", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/private_chats" do
    it "returns a user's private chats with messsages" do
      public_chat = create(:chat, :public)
      private_chat_no_messages = create(:chat, :private)
      create(:chat_participant, user: @user, chat: private_chat_no_messages)
      private_chat_messages = create(:chat, :private)
      create(:chat_participant, user: @user, chat: private_chat_messages)
      create(:message, chat: private_chat_messages)

      get api_v1_private_chats_path
      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(private_chat_messages.name)
      expect(response.body).not_to include(private_chat_no_messages.name)
      expect(response.body).not_to include(public_chat.name)
    end
  end

  describe "POST /api/v1/private_chats" do
    before(:each) do
      @user2 = create(:user)
      @existing_chat = create(:chat, :private)
      create(:chat_participant, user: @user, chat: @existing_chat)
      create(:chat_participant, user: @user2, chat: @existing_chat)
    end

    it "returns new chat with participants if did not previously exist" do
      user3 = create(:user)
      params = { private_chat: { chat_participants_attributes: [{ user_id: @user.id }, { user_id: @user2.id }, { user_id: user3.id }] } }

      post api_v1_private_chats_path, params: params
      expected_chat_name = [@user.username, @user2.username, user3.username].sort.join(", ")

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(expected_chat_name)
    end

    it "returns existing chat if there is one" do
      params = { private_chat: { chat_participants_attributes: [{ user_id: @user.id }, { user_id: @user2.id }] } }

      post api_v1_private_chats_path, params: params
      expected_chat_name = [@user.username, @user2.username].sort.join(", ")

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(expected_chat_name)
    end
  end
end
