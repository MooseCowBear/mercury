require 'rails_helper'

RSpec.describe "Messages", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
    @room = create(:room)
  end

  describe "POST /api/v1/messages/create" do
    it "creates a message and returns it" do
      post '/api/v1/messages/create', params: 
          { message: { 
            body: "new message",
            room_id: @room.id
          } }
      expect(response).to have_http_status(200)
      expect(response.body).to include("new message")
    end
  end

  describe "POST /api/v1/messages/update" do
    it "updates a message and returns it when it belongs to current user" do
      message = create(:message, room: @room, user: @user)
      post "/api/v1/messages/update/#{message.id}", params: 
            { message: {
              body: "new edited message",
              room_id: @room.id
            } }
      expect(response).to have_http_status(200)
      expect(response.body).to include("new edited message")
    end

    it "redirects when message does not belong to current user" do
      user2 = create(:user, username: "frank", email: "frank@test.com")
      message = create(:message, room: @room, user: user2)
      post "/api/v1/messages/update/#{message.id}", params: 
            { message: {
              body: "new edited message",
              room_id: @room.id
            } }
      expect(response).to redirect_to(root_path)
    end
  end

  describe "DELETE /api/v1/messages/destroy" do
    it "destroys message and returns it when it belongs to current user" do
      message = create(:message, room: @room, user: @user)
      delete "/api/v1/messages/destroy/#{message.id}"
      expect(response).to have_http_status(200)
      expect(response.body).to include("i am a test message")
    end

    it " redirects when message does not belong to current user" do
      user2 = create(:user, username: "frank", email: "frank@test.com")
      message = create(:message, room: @room, user: user2)
      delete "/api/v1/messages/destroy/#{message.id}"
      expect(response).to redirect_to(root_path)
    end
  end
end
