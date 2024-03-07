class AddUniqueIndexToChatParticipants < ActiveRecord::Migration[7.0]
  def change
    add_index :chat_participants, [:user_id, :chat_id], unique: true
  end
end
