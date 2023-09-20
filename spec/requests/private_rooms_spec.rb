require 'rails_helper'

RSpec.describe "PrivateRooms", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/private_rooms/index" do
    it "returns a user's private rooms" do
      room = create(
        :room, 
        name: "private room", 
        is_private: true, 
        interlocutor_one: @user
      )
      get api_v1_private_rooms_index_path
      expect(response).to have_http_status(200)
      expect(response.body).to include("private room")
    end
  end

  describe "POST /api/v1/private_rooms/create" do
    it "creates new room if one did not already exist and returns it" do
      user2 = create(:user, username: "frank", email: "frank@test.com")
      post '/api/v1/private_rooms/create', params: { user_id: user2.id }
      expect(response).to have_http_status(200)
      expect(response.body).to include("frank")
    end

    it "finds and return room if room already exists" do
      user2 = create(:user, username: "frank", email: "frank@test.com")
      room = create(
        :room, 
        name: "pc_#{@user.username}_#{user2.username}", 
        is_private: true, 
        interlocutor_one: @user, 
        interlocutor_two: user2
      )
      post '/api/v1/private_rooms/create', params: { user_id: user2.id }
      expect(response).to have_http_status(200)
      expect(response.body).to include("frank")
    end
  end

  describe "DELETE /api/v1/private_rooms/destroy" do
    it "responds with 'deleted' room if user is participant" do
      user2 = create(:user, username: "frank", email: "frank@test.com")
      room = create(
        :room, 
        name: "pc_#{@user.username}_#{user2.username}", 
        is_private: true, 
        interlocutor_one: @user, 
        interlocutor_two: user2
      )
      delete "/api/v1/private_rooms/destroy/#{room.id}"
      expect(response).to have_http_status(200)
      expect(response.body).to include(room.name)
    end

    it "redirects if user if not a participant" do
      user2 = create(:user, username: "frank", email: "frank@test.com")
      user3 = create(:user, username: "zoe", email: "zoe@test.com")
      room = create(
        :room, 
        name: "pc_#{user2.username}_#{user3.username}", 
        is_private: true, 
        interlocutor_one: user2, 
        interlocutor_two: user3
      )
      delete "/api/v1/private_rooms/destroy/#{room.id}"
      expect(response).to redirect_to(root_path)
    end
  end
end
