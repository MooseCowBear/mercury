class Chat < ApplicationRecord 
  has_many :messages, -> { order(created_at: :asc) }, dependent: :destroy
  has_one :last_message, -> { order(created_at: :desc) }, class_name: "Message"
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :users, through: :chat_participants
  has_many :active_users, -> { where(chat_participants: { silence: false }).where(deleted: false) }, through: :chat_participants, source: :user

  validates :name, length: { within: 1..45 }, if: -> {!is_private}
  validates :name, presence: true
  validates :name, uniqueness: { scope: :is_private, message: "A chat with this name already exists." }

  accepts_nested_attributes_for :chat_participants
  
  scope :public_chats, -> { where(is_private: false) }
  scope :active, -> { where("updated_at >= ?", 1.week.ago) } 
  scope :inactive, -> { where("updated_at < ?", 1.week.ago) }
  scope :has_message, -> { where(id: Message.select(:chat_id)) }
  scope :visible, -> { where(always_visible: true).or(active.has_message) }

  # without second where, get chats that contain specified users but not only specified users
  # so first part is: chat that contains these users
  # and second part is: chat with exactly x number of users
  scope :with_participants, 
    -> (user_ids) {
      where(
        id: ChatParticipant.select(:chat_id)
        .where(user_id: user_ids)
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

  def active_participant?(user)
    return true unless is_private
    active_users.exists?(user.id)
  end

  def chat_messages(user)
    if is_private
      # user.private_chat_messages(self)
      messages.private_messages_for(user) # which way is better?
    else
      messages 
    end
  end

  # TODO: remove when sure not using
  def last_private_message(user)
    chat_messages(user).last
  end

  def notification_count(user)
    notifications.where(user_id: user.id).size
  end

  # filtering included associations manually, no n + 1 but gets more records than necessary...
  def notification_count_for_chat(user)
     notifications.select{ |n| n.user_id == user.id }.length
  end

  def last_private_message_for_chat(user)
    messages.select do |m|
      m.private_message_recipients.any? { |pmr| pmr.user_id == user.id }
    end.last
  end

  def silenced?(user)
    chat_participants.select { |cp| cp.user_id == user.id }.first&.silence
  end

  def as_json(options = {})
    super(options).tap do |json|
      if is_private && options[:user]
        json[:notification_count] = notification_count_for_chat(options[:user])
        json[:last_message] = last_private_message_for_chat(options[:user])
        json[:silenced] = silenced?(options[:user])
      end
    end
  end

  private

  def clean_name
    self.name = name.strip.downcase if name
  end
end
