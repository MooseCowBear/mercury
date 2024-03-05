class Chat < ApplicationRecord 
  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :users, through: :chat_participants

  validates :name, presence: true, uniqueness: true, length: { within: 1..45 }, if: -> {!is_private}
  
  scope :public_chats, -> { where(is_private: false) }
  scope :active, -> { where("updated_at >= ?", 1.week.ago) } 

  # for registrations destroy callback -- TODO: Change this to no participants
  scope :private_destroyable,
    -> (user) { 
      where(interlocutor_one_id: nil).or(where(interlocutor_two_id: nil)).
      user_private_chats(user)
    }

  before_validation :clean_name
  after_create_commit :broadcast_public_chat, unless: :is_private?
  after_commit :broadcast_private_chat, if: :is_private?

  def self.safe_find_or_create_by(*args, &block)
    find_or_create_by *args, &block
  rescue ActiveRecord::RecordNotUnique
    retry
  end

  # TODO: this will change
  def self.private_chat_create(user, other_user_id)
  end

  # will change
  def participant?(user)
    return true unless is_private
  end

  # will change
  def chat_messages(user)
    return messages unless is_private
  end

  protected

  def clean_name
    self.name = self.name.strip.downcase
  end

  private 

  def broadcast_public_chat
    unless is_private
      ActionCable.server.broadcast("ChatsChannel", self)
    end
  end

  def broadcast_private_chat
    chat = self.as_json(include: []) # all participants
  end
end
