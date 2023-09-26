class AddPublicIdToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :public_id, :string
  end
end
