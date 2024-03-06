class AddSilenceColumnToChatParticipants < ActiveRecord::Migration[7.0]
  def change
    add_column :chat_participants, :silence, :boolean, default: false
  end
end
