class Chat < ApplicationRecord 
  attr_accessor :current_user

  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :users, through: :chat_participants
  has_many :active_users, -> { where(chat_participants: { silence: false }) }, through: :chat_participants, source: :user

  validates :name, length: { within: 1..45 }, if: -> {!is_private}
  validates :name, presence: true
  validates :name, uniqueness: { scope: :is_private, message: "A chat with this name already exists." }

  accepts_nested_attributes_for :chat_participants
  
  scope :public_chats, -> { where(is_private: false) }
  scope :active, -> { where("updated_at >= ?", 1.week.ago) } 
  scope :inactive, -> { where("updated_at < ?", 1.week.ago) }
  scope :has_message, -> { where(id: Message.select(:chat_id)) }
  scope :visible, -> { where(always_visible: true).or(active.has_message) }

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

  # for preventing a user with chat blocked, or non-chat member from sending messages to chat
  def participant?(user)
    return true unless is_private
    users.exists?(user.id)
  end

  def active_participant?(user)
    return true unless is_private
    active_users.exists?(user.id)
  end

  def chat_messages(user)
    if is_private
      user.private_chat_messages(self)
    else
      messages 
    end
  end

  def last_message
    messages.order(created_at: :desc).first
  end

  def last_private_message(user)
    chat_messages(user).order(created_at: :desc).first
  end

  def notification_count(user)
    notifications.where(user_id: user.id).count
  end

  def as_json(options = {})
    super(options).tap do |json|
      if is_private && options[:user]
        json[:notification_count] = notification_count(options[:user])
        json[:last_message] = last_private_message(options[:user])
        json[:silenced] = !active_participant?(options[:user])
      elsif !is_private
        json[:last_message] = last_message
      end
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
