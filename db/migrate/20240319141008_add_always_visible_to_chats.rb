class AddAlwaysVisibleToChats < ActiveRecord::Migration[7.0]
  def change
    add_column :chats, :always_visible, :boolean, default: :false
  end
end
