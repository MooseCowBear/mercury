class PrivateChat::CreateService < ApplicationService
  # private chats are identified by their participants. If a chat between a set of
  # users already exists and someone tries to request a new chat with those users
  # want to find the existing chat and return it
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
    user_ids = params.dig(:chat_participants_attributes).map { |key| key[:user_id].to_i }
    return unless user_ids.include?(current_user.id)

    chat = Chat.with_participants(user_ids).first

    unless chat
      chat = Chat.create(params.merge(is_private: true))
    end
    chat
  end
end
