class Api::V1::ChatParticipantsController < ApplicationController
  before_action :set_chat_participant

  def update
    @chat_participant.toggle!(:silence)
    render json: current_user.to_json
  end

  private

  def set_chat_participant
    @chat_participant = ChatParticipant.find_by(chat_id: params[:id], user_id: current_user.id)
  end
end
