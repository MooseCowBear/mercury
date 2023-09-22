class AddMessageColumnToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_reference :notifications, :message, null: false, foreign_key: true
  end
end
