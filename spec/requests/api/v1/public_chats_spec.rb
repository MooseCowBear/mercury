require 'rails_helper'

RSpec.describe "Api::V1::PublicChats", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/public_chats" do
    it "returns active public chats that have messages" do 
      public_chat_without_messages = create(:chat, :public)
      inactive_chat = create(:chat, :over_week_old, is_private: false)
      public_chat_with_messages = create(:chat, :public)
      create(:message, chat: public_chat_with_messages)

      get api_v1_public_chats_path

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(public_chat_with_messages.name)
      expect(response.body).not_to include(public_chat_without_messages.name)
      expect(response.body).not_to include(inactive_chat.name)
    end
  end

  describe "POST /api/v1/public_chats" do
    it "creates a new public chat if name is not taken" do
      post api_v1_public_chats_path, params: { public_chat: { name: "untaken name" } }

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include("untaken name")
    end

    it "returns 422 response if name is taken" do
      create(:chat, :public, name: "taken name")
      post api_v1_public_chats_path, params: { public_chat: { name: "taken name" } }

      expect(response).to have_http_status(422)
    end
  end
end