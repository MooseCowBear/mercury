class RemoveUserChatIndexFromChatParticipants < ActiveRecord::Migration[7.0]
  def change
    remove_index :chat_participants, name: "index_chat_participants_on_user_id_and_chat_id"
  end
end
