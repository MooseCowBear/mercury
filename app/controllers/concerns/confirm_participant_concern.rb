module ConfirmParticipantConcern 
  extend ActiveSupport::Concern

  # for making sure someone can't send a message to a private chat they do not belong to
  
  included do
    def confirm_participant 
      chat_id = params[:chat_id] || params[:message][:chat_id]
      @chat = Chat.find(chat_id)
      unless @chat.active_participant?(current_user)
        raise ActiveRecord::RecordNotFound
      end
    end
  end
end