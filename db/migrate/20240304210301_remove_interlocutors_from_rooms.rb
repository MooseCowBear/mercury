class RemoveInterlocutorsFromRooms < ActiveRecord::Migration[7.0]
  def change
    remove_column :rooms, :interlocutor_one_id, :bigint
    remove_column :rooms, :interlocutor_two_id, :bigint
    remove_column :rooms, :marked_delete_one, :boolean
    remove_column :rooms, :marked_delete_two, :boolean
    remove_column :rooms, :restored_at_one, :datetime
    remove_column :rooms, :restored_at_two, :datetime
  end
end
