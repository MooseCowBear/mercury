class RenameRoomIdInChatParticipants < ActiveRecord::Migration[7.0]
  def change
    rename_column :chat_participants, :room_id, :chat_id
  end
end
