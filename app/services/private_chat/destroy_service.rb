class PrivateChat::DestroyService < ApplicationService
  # if a user deletes their account and they were the only remaining user for one 
  # or more private chats, want to destroy those chats and by extension their 
  # messages, notifications, chat participant records
  attr_accessor :current_user

  def initialize(current_user)
    @current_user = current_user
  end

  def call
    destroy_chats
  end

  private

  def destroy_chats
    current_user.update(current_chat_id: nil)
    Chat.with_participants([current_user.id]).destroy_all
  end
end

# actually, could go farther
# can delete chats where all users have been "deleted"
# TODO: update!

# need to add a check for are all the participants of this chat "deleted"