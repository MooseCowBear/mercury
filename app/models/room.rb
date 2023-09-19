class Room < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy

  belongs_to :interlocutor_one, 
    class_name: "User", 
    foreign_key: "interlocutor_one_id", 
    optional: true
  belongs_to :interlocutor_two, 
    class_name: "User", 
    foreign_key: "interlocutor_two_id", 
    optional: true
  belongs_to :creator, 
    class_name: "User", 
    foreign_key: "creator_id", 
    optional: true

  validates :name, presence: true, uniqueness: true, length: { within: 1..45 }
  
  scope :public_rooms, -> { where(is_private: false) }
  scope :user_private_rooms, 
    ->(user) { 
      where(interlocutor_one: user, marked_delete_one: false).
      or(where(interlocutor_two: user, marked_delete_two: false)) 
    }
  scope :active, 
    -> { where("updated_at >= ?", 1.week.ago).or(where(creator_id: nil)) } 

  # for registrations destroy callback
  scope :private_destroyable,
    -> (user) { 
      where(interlocutor_one_id: nil).or(where(interlocutor_two_id: nil)).
      user_private_rooms(user)
    }

  before_validation :clean_name
  after_create_commit :broadcast_public_room, unless: :is_private?
  after_commit :broadcast_private_room, if: :is_private?

  def self.safe_find_or_create_by(*args, &block)
    find_or_create_by *args, &block
  rescue ActiveRecord::RecordNotUnique
    retry
  end

  def interlocutor_one?(user)
    interlocutor_one == user
  end

  def interlocutor_two?(user)
  interlocutor_two == user
  end

  def participant?(user)
    return true unless is_private?
    interlocutor_one?(user) || interlocutor_two?(user)
  end

  def room_messages(user)
    if interlocutor_one?(user) && restored_at_one
      messages.active_messages(restored_at_one)
    elsif interlocutor_two?(user) && restored_at_two
      messages.active_messages(restored_at_two)
    else
      messages.order(created_at: :asc)
    end
  end

  def restoring_for_one?(user)
    interlocutor_one?(user) && marked_delete_one
  end

  def restoring_for_two?(user)
    interlocutor_two?(user) && marked_delete_two
  end

  def private_room_destroy(user)
    # bc want private chats to remain until both parties "delete"
    # so that non-deleter retains chats on their end
    if interlocutor_one_id.nil? || interlocutor_two_id.nil?
      self.destroy
    elsif interlocutor_one?(user) && marked_delete_two
      self.destroy
    elsif interlocutor_two?(user) && marked_delete_one
      self.destroy
    elsif interlocutor_one?(user)
      self.update(marked_delete_one: true, restored_at_one: nil)
    elsif interlocutor_two?(user)
      self.update(marked_delete_two: true, restored_at_two: nil)
    end
  end

  protected

  def clean_name
    self.name = self.name.strip.downcase
  end

  private 

  def broadcast_public_room
    ActionCable.server.broadcast("RoomsChannel", self)
  end

  def broadcast_private_room
    room = self.as_json(include: [:interlocutor_one, :interlocutor_two])
    unless marked_delete_one
      ActionCable.server.broadcast("user_#{self.interlocutor_one_id}", room)
    end
    unless marked_delete_two
      ActionCable.server.broadcast("user_#{self.interlocutor_two_id}", room)
    end
  end
end
