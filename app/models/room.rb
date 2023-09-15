class Room < ApplicationRecord
  has_many :messages, dependent: :destroy
  belongs_to :interlocutor_one, class_name: "User", foreign_key: "interlocutor_one_id", optional: true
  belongs_to :interlocutor_two, class_name: "User", foreign_key: "interlocutor_two_id", optional: true
  belongs_to :creator, class_name: "User", foreign_key: "creator_id", optional: true
  has_many :notifications, dependent: :destroy

  validates_presence_of :name
  validates_uniqueness_of :name
  scope :public_rooms, -> { where(is_private: false) }
  scope :user_private_rooms, ->(user) { where(interlocutor_one: user, marked_delete_one: false).or(where(interlocutor_two: user, marked_delete_two: false)) }

  after_create_commit :broadcast_public_room, unless: :is_private?
  after_create_commit :broadcast_private_room, if: :is_private?

  def self.safe_find_or_create_by(*args, &block)
    find_or_create_by *args, &block
  rescue ActiveRecord::RecordNotUnique
    retry
  end

  def participant?(user)
    return true unless is_private?
    self.interlocutor_one == user || self.interlocutor_two == user
  end

  def room_messages(user)
    if is_private && user == interlocutor_one && restored_at_one
      messages.active_messages(restored_at_one).order(created_at: :asc)
    elsif is_private && user == interlocutor_two && restored_at_two
      messages.active_messages(restored_at_two).order(created_at: :asc)
    else
      messages.order(created_at: :asc)
    end
  end

  private 

  def broadcast_public_room
    ActionCable.server.broadcast("RoomsChannel", self)
  end

  def broadcast_private_room
    room = self.as_json(include: [:interlocutor_one, :interlocutor_two])
    ActionCable.server.broadcast("user_#{self.interlocutor_one_id}", room)
    ActionCable.server.broadcast("user_#{self.interlocutor_two_id}", room)
  end
end
