class PublicChat::DestroyService < ApplicationService
  # want to clean up old public chats that aren't being used
  def call
    destroy_chats
  end

  private 

  def destroy_chats
    Chat.public_chats.inactive.destroy_all
  end
end