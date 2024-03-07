class PrivateChatCreateService 
  attr_accessor :params, :current_user

  def initialize(params, current_user)
    @params = params
    @current_user = current_user
  end

  def self.call(*args)
    new(*args).find_or_create
  end

  def find_or_create
    # returns the existing chat with those particpants 
    # or creates a new chat and the chat participants and returns it
    user_ids = params.dig(:chat_participants_attributes).map { |key| key[:user_id] }
    return unless user_ids.include?(current_user.id)

    chat = Chat.where(
      id: ChatParticipant.select(:chat_id).group(:chat_id).where(user_id: user_ids)
        .having("count(user_id) = ?", user_ids.count)
    ).first

    unless chat
      chat = Chat.create(params.merge(is_private: true))
    end
    chat
  end
end