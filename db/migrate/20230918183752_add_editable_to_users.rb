class AddEditableToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :editable, :boolean, default: true
  end
end
