class RemoveCreatorFromRooms < ActiveRecord::Migration[7.0]
  def change
    remove_column :rooms, :creator_id, :bigint
  end
end
