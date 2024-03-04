class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  has_many :messages, dependent: :nullify
  has_many :notifications, dependent: :destroy
  has_many :chat_participants, dependent: :destroy
  has_many :chats, through: :chat_participants # group chats

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

  before_validation :clean_username
  after_update :clear_user_notifications, if: :saved_change_to_current_chat_id?

  def update_last_active
    self.touch(:last_active)
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
