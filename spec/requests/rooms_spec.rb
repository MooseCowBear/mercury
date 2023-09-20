require 'rails_helper'

RSpec.describe "Rooms", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/rooms/index" do
    it "returns a list of public rooms without a specified creator and those active in the last week" do
      room1 = create(:room)
      room2 = create(:old_room, creator: @user)
      room3 = create(:old_room, name: "other room")
      get api_v1_rooms_index_path
      expect(response).to have_http_status(200)
      expect(response.body).to include("test room")
      expect(response.body).to include("other room")
      expect(response.body).not_to include("old room")
    end
  end

  describe "GET /api/v1/rooms/show" do
    it "returns the rooms messages for room" do
      room1 = create(:room)
      message = create(:message, room: room1, user: @user)
      get api_v1_path(room1.id) #why is this the path??
      expect(response).to have_http_status(200)
      expect(response.body).to include("i am a test message")
    end
  end

  describe "POST /api/v1/rooms/create" do
    it "creates and returns room" do
      post '/api/v1/rooms/create', params: 
          { room: { 
            name: "room to create",
            is_private: false
          } }
      expect(response).to have_http_status(200)
      expect(response.body).to include("room to create")
    end
  end

  describe "POST /api/v1/rooms/update" do
    it "updates and returns room when user is creator" do
      room1 = create(:room, name: "room to update", creator: @user)
      post "/api/v1/rooms/update/#{room1.id}", params: 
            { room: {
              name: "new room name"
            } }
      expect(response).to have_http_status(200)
      expect(response.body).to include("new room name")
    end

    it "redirects to root if user is not creator" do
      room1 = create(:room, name: "room to update")
      post "/api/v1/rooms/update/#{room1.id}", params: 
            { room: {
              name: "new room name"
            } }
      expect(response).to redirect_to(root_path)
    end
  end
end
