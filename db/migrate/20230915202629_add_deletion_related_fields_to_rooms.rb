class AddDeletionRelatedFieldsToRooms < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :marked_delete_one, :boolean, default: false
    add_column :rooms, :marked_delete_two, :boolean, default: false
    add_column :rooms, :restored_at_one, :datetime
    add_column :rooms, :restored_at_two, :datetime
  end
end
