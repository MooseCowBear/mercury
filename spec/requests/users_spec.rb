require 'rails_helper'

RSpec.describe "Users", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/users/index" do
    it "returns a list of all users except signed in user" do
      other_user = create(:user, username: "frank", email: "frank@test.com")
      get api_v1_users_index_path
      expect(response).to have_http_status(200)
      expect(response.body).to include("frank")
      expect(response.body).not_to include("joe")
    end
  end

  describe "GET /api/v1/users/show" do
    it "returns signed in user" do
      get api_v1_users_show_path
      expect(response).to have_http_status(200)
      expect(response.body).to include("joe")
    end
  end
end
