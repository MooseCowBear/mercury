class PrivateChatCreateService 
  def initialize(params)
    @params = params
  end

  def call
    # takes an array of user ids and either returns the existing chat with those particpants 
    # or creates a new chat and the chat participants and returns it
    user_ids = @params.dig(:chat_participants_attributes).map { |key| key[:user_id] }
    chat = Chat.where(
      id: ChatParticipant.select(:chat_id).group(:chat_id).where(user_id: user_ids)
        .having("count(user_id) = ?", user_ids.count)
    ).first

    unless chat
      chat = Chat.create(@params.merge(is_private: true))
    end
    chat
  end
end