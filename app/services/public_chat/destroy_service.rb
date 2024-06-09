class PublicChat::DestroyService < ApplicationService
  # want to clean up old public chats that aren't being used
  def call
    destroy_chats
  end

  private 

  def destroy_chats
    # remove any users that failed to leave the chat
    User.where(current_chat_id: Chat.public_chats.inactive.pluck(:id)).update_all(current_chat_id: nil)
    Chat.public_chats.inactive.destroy_all
  end
end