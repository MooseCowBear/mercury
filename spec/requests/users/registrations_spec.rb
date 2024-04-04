require 'rails_helper'

RSpec.describe "Users::Registrations", type: :request do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  describe "destroy" do
    it "updates current user's deleted column to true" do
      delete user_registration_path
      @user.reload
      expect(@user.deleted).to eq true
    end

    it "destroys private chat rooms for which user was the only participant" do
      private_chat = create(:chat, :private)
      create(:chat_participant, user: @user, chat: private_chat)

      expect { 
        delete user_registration_path
      }.to change { Chat.count }.by(-1)
    end
  end
end