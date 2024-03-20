require 'rails_helper'

RSpec.describe "Api::V1::ChatParticipants", type: :request do
  before(:each) do
    @user = create(:user)
    @chat = create(:chat, :private)
    @participant_record = create(:chat_participant, user: @user, chat: @chat)
    @user.update(current_chat_id: @chat.id)
    sign_in @user
  end

  describe "POST /api/v1/private_chats/:id/silence" do
    it "returns http success" do
      post silence_api_v1_private_chat_path(@chat)
      expect(response).to have_http_status(:success)
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "updates silence attribute to true if was false" do
      post silence_api_v1_private_chat_path(@chat)
      res =  JSON.parse(response.body)

      expect(res.has_key?("current_chat_silenced")).to be_truthy
      expect(res["current_chat_silenced"]).to eq true
      @participant_record.reload
      expect(@participant_record.silence).to be true
    end

    it "updates silence attribute to false if was true" do
      @participant_record.update(silence: true)
      post silence_api_v1_private_chat_path(@chat)
      res =  JSON.parse(response.body)

      expect(res.has_key?("current_chat_silenced")).to be_truthy
      expect(res["current_chat_silenced"]).to eq false
      @participant_record.reload
      expect(@participant_record.silence).to be false
    end
  end
end