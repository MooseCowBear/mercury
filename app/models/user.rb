class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  has_many :messages, dependent: :nullify
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :chats, through: :chat_participants # private chats
  has_many :private_message_recipients, dependent: :destroy
  has_many :received_messages, through: :private_message_recipients, source: :message

  belongs_to :current_chat, 
    foreign_key: "current_chat_id", 
    class_name: "Chat", 
    optional: true

  validates :username, 
    presence: true, 
    uniqueness: true, 
    length: { within: 1..20 }

  scope :other_users, ->(user) { where.not(id: user) }
  scope :ordered_by_username, -> { order(username: :asc) }
  scope :outside_chat, 
    ->(chat) { where.not(current_chat_id: chat).or(where(current_chat_id: nil)) }

  before_validation :clean_username
  after_update :clear_user_notifications, if: :saved_change_to_current_chat_id?

  def update_last_active
    self.touch(:last_active)
  end

  def private_chat_messages(chat)
    received_messages.where(chat_id: chat.id)
  end

  def as_json(options = {})
    super(options).tap do |json|
      json[:current_chat_silenced] = !current_chat.active_participant?(self) if current_chat
      json[:current_chat] = current_chat.as_json({ user: self })
    end
  end

  protected

  def clean_username
    self.username = self.username.strip.downcase
  end

  private 

  def clear_user_notifications
    if current_chat
      self.notifications.where(chat_id: current_chat_id).delete_all
    end
  end
end
