require 'rails_helper'

RSpec.describe "Notifications", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "GET /api/v1/notifications/index" do
    it "returns the user's notifications" do
      room = create(:room)
      notification = create(:notification, user: @user, room: room)
      get api_v1_notifications_index_path
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).length).to eq(1)
    end
  end
end
