module ConfirmParticipantConcern 
  extend ActiveSupport::Concern

  included do
    def confirm_participant 
      @room = Room.find(params[:room_id])
      unless @room.participant?(current_user)
        flash[:alert] = "You cannot post messages to private rooms that do not belong to you."
          redirect_to root_path
      end
    end
  end
end