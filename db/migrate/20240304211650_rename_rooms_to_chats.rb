class RenameRoomsToChats < ActiveRecord::Migration[7.0]
  def change
    rename_table :rooms, :chats
  end
end
