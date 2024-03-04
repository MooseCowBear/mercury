class RenameCurrentRoomIdInUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :current_room_id, :current_chat_id
  end
end
