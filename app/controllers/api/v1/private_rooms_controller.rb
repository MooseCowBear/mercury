class Api::V1::PrivateRoomsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_room, only: [:destroy]
  before_action :verify_private_participant, only: [:destroy]
  
  def index
    rooms = Room.user_private_rooms(current_user)
    render json: rooms, include: [:interlocutor_one, :interlocutor_two]
  end

  def create
    # moved to using usernames instead of ids bc still unique 
    # and then frontend still has access to the username if user deletes account
    other_user = User.find(params[:user_id])
    sorted_users = sort_users(current_user, other_user)
    room_name = generate_name(sorted_users)
    room = Room.safe_find_or_create_by(
      name: room_name, 
      is_private: true, 
      interlocutor_one_id: sorted_users[0].id, 
      interlocutor_two_id: sorted_users[1].id
    )
 
    if room.restoring_for_one?(current_user)
      room.update(marked_delete_one: false, restored_at_one: DateTime.current)
    elsif room.restoring_for_two?(current_user)
      room.update(marked_delete_two: false, restored_at_two: DateTime.current)
    end

    render json: room, include: [:interlocutor_one, :interlocutor_two]
  end

  def destroy
    @room.private_room_destroy(current_user)
    
    render json: @room
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  def verify_private_participant
    unless @room.is_private && @room.participant?(current_user)
      flash[:alert] = "You're request could not be completed."
      redirect_to root_path
    end
  end

  def sort_users(one, two)
    if one.id < two.id 
      [one, two]
    else
      [two, one]
    end
  end

  def generate_name(sorted_users)
    "pc_#{sorted_users[0].username}_#{sorted_users[1].username}"
  end

  def private_room_params
    params.require(:private_room).permit(:user_id)
  end
end
