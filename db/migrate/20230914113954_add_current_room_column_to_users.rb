class AddCurrentRoomColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :current_room, null: true, foreign_key: { to_table: :rooms }
  end
end
