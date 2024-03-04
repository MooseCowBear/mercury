class RenameRoomIdInMessages < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :room_id, :chat_id
  end
end
