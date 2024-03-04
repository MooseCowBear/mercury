class RenameRoomIdInNotifications < ActiveRecord::Migration[7.0]
  def change
    rename_column :notifications, :room_id, :chat_id
  end
end
