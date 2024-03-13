class Chat < ApplicationRecord 
  attr_accessor :current_user

  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :users, through: :chat_participants
  has_many :active_users, -> { where(chat_participants: { silence: false }) }, through: :chat_participants, source: :user

  validates :name, length: { within: 1..45 }, if: -> {!is_private}
  validates :name, presence: true, uniqueness: true

  accepts_nested_attributes_for :chat_participants
  
  scope :public_chats, -> { where(is_private: false) }
  scope :active, -> { where("updated_at >= ?", 1.week.ago) } 

  scope :with_participants, 
    -> (user_ids) {
      where(
        id: ChatParticipant.select(:chat_id)
        .where(user_id: [user_ids])
        .group(:chat_id)
        .having("count(user_id) = ?", user_ids.count)
      )
      .where(
        id: ChatParticipant.select(:chat_id)
        .group(:chat_id)
        .having("count(user_id) = ?", user_ids.count)
      )
    }

  before_validation :clean_name

  def participant?(user)
    return true unless is_private
    users.exists?(user.id)
  end

  # if want to allow "deleting" a private chat, this will change
  def chat_messages(user)
    messages 
  end

  def last_message
    messages.order(created_at: :desc).first
  end

  def notification_count(user)
    notifications.where(user_id: user.id).count
  end

  def as_json(options = {})
    super(options).tap do |json|
      if is_private
        json[:notification_count] = notification_count(options[:user])
      end
      json[:last_message] = last_message
    end
  end

  protected

  def clean_name
    self.name = self.name.strip.downcase if self.name
  end

  private 

  def broadcast_public_chat
    unless is_private
      ActionCable.server.broadcast("PublicChatsChannel", self)
    end
  end
end
