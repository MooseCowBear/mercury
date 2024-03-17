require 'rails_helper'

RSpec.describe "Api::V1::Messages", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
    @chat = create(:chat, :public)
  end

  describe "POST /api/v1/messages" do
    it "creates a message and returns it" do
      post api_v1_messages_path, params: { message: { body: "new message", chat_id: @chat.id } }

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include("new message")
    end
  end

  describe "PATCH /api/v1/messages" do
    it "updates a message and returns it when it belongs to current user" do
      message = create(:message, chat: @chat, user: @user)
      patch api_v1_message_path(message), params: { message: { body: "new edited message" } }

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include("new edited message")
    end

    it "responds with 422 if message body is blank" do
      message = create(:message, chat: @chat, user: @user)
      patch api_v1_message_path(message), params: { message: { body: "" } }

      expect(response).to have_http_status(422)
    end

    it "responds with 404 when message does not belong to current user" do
      message = create(:message)

      expect { 
        patch api_v1_message_path(message), params: { message: { body: "new edited message" } } 
      }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

  describe "DELETE /api/v1/messages/" do
    # finish once figure out behavior
  end
end
