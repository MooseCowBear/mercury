class CreatePrivateMessageRecipients < ActiveRecord::Migration[7.0]
  def change
    create_table :private_message_recipients do |t|
      t.references :user, null: false, foreign_key: true
      t.references :message, null: false, foreign_key: true

      t.timestamps
    end
  end
end
