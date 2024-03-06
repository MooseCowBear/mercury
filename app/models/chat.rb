class Chat < ApplicationRecord 
  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :users, through: :chat_participants
  has_many :active_users, -> { where(chat_participants: { silence: false }) }, through: :chat_participants, source: :user

  validates :name, presence: true, uniqueness: true, length: { within: 1..45 }, if: -> {!is_private}
  
  scope :public_chats, -> { where(is_private: false) }
  scope :active, -> { where("updated_at >= ?", 1.week.ago) } 

  # for registrations destroy callback 
  # if a chat has only this user then it should be destroyed when the user is destroyed
  # is this going to be a problem? 
  # is there a way to do this without 2 queries?
  scope :private_destroyable, 
    ->(user) {
      where(id: ChatParticipant.select(:chat_id).group(:chat_id).where(user_id: user_id)
      .having("count(user_id) = ?", 1))
    }

  before_validation :clean_name
  after_create_commit :broadcast_public_chat, unless: :is_private?
  after_commit :broadcast_private_chat, if: :is_private?

  def self.private_chat_create(user_ids)
    # need to check if the chat with these participants exists already or not.
    # if yes, just return it otherwise create it along with its chat participants 
  end

  def participant?(user)
    return true unless is_private
    users.exists?(user.id)
  end

  # if want to allow "deleting" a private chat
  def chat_messages(user)
    return messages unless is_private
    
  end

  protected

  def clean_name
    self.name = self.name.strip.downcase if self.name
  end

  private 

  def broadcast_public_chat
    unless is_private
      ActionCable.server.broadcast("ChatsChannel", self)
    end
  end

  def broadcast_private_chat
    chat = self.as_json(include: :users) # for broadcasting the creation of a new room
    # needs updating
  end
end