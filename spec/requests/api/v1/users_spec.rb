require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/users/index" do
    it "returns a list of all users except signed in user" do
      other_user = create(:user)
      get api_v1_users_path

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(other_user.username)
      expect(response.body).not_to include(@user.username)
    end
  end

  describe "GET /api/v1/users/show" do
    it "returns signed in user with current chat" do
      chat = create(:chat)
      @user.current_chat_id = chat.id

      get api_v1_users_show_path

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(@user.username)
      expect(response.body).to include(chat.name)
    end
  end

  describe "PATCH /api/v1/users/:id" do
    it "updates current user's current chat and returns user with chat" do
      chat = create(:chat)

      patch api_v1_user_path(@user), params: { user: { current_chat_id: chat.id } }

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response.body).to include(chat.name)
    end
  end
end
