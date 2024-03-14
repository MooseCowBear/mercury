class PrivateChat::CreateService < ApplicationService
  # want private chats to be unique to set of participants
  # so if a chat already exists with participants, want to find it
  # and if doesn't exist, then want to create both it and the participants that 
  # belong to/define it
  attr_accessor :params, :current_user

  def initialize(params, current_user)
    @params = params
    @current_user = current_user
  end

  def call
    find_or_create
  end

  private

  def find_or_create
    user_ids = params.dig(:chat_participants_attributes).map { |key| key[:user_id] }
    name = User.where(id: user_ids).pluck(:username).sort.join(", ")

    return unless user_ids.include?(current_user.id)

    chat = Chat.find_by(name: name)

    unless chat
      chat = Chat.create(params.merge(is_private: true, name: name))
    end
    chat
  end
end

