class Room < ApplicationRecord
  has_many :messages
  belongs_to :interlocutor_one, class_name: "User", foreign_key: "interlocutor_one_id", optional: true
  belongs_to :interlocutor_two, class_name: "User", foreign_key: "interlocutor_two_id", optional: true
  belongs_to :creator, class_name: "User", foreign_key: "creator_id", optional: true

  validates_presence_of :name
  validates_uniqueness_of :name
  scope :public_rooms, -> { where(is_private: false) }
  scope :user_private_rooms, ->(user) { where(interlocutor_one: user).or(where(interlocutor_two: user)) }

  # after_create_commit :broadcast_public_room, unless: :is_private?
  # after_create_commit :broadcast_private_room, if: :is_private?

  def self.safe_find_or_create_by(*args, &block)
    find_or_create_by *args, &block
  rescue ActiveRecord::RecordNotUnique
    retry
  end

  def participant?(user)
    return true unless is_private?
    self.interlocutor_one == user || self.interlocutor_two == user
  end

  private 

  # def broadcast_public_room
  #   ActionCable.server.broadcast("RoomsChannel", self)
  # end

  # def broadcast_private_room
  #   ActionCable.server.broadcast("user_#{self.interlocutor_one_id}", self)
  #   ActionCable.server.broadcast("user_#{self.interlocutor_two_id}", self)
  # end
end
