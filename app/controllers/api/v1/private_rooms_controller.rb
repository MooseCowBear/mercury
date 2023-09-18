class Api::V1::PrivateRoomsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_room, only: [:destroy]
  before_action :verify_private_participant, only: [:destroy]
  
  def index
    rooms = Room.user_private_rooms(current_user).private_viable
    render json: rooms, include: [:interlocutor_one, :interlocutor_two]
  end

  def create
    sorted_ids = sort_users(current_user.id, private_room_params[:user_id])
    room_name = generate_name(sorted_ids)
    room = Room.safe_find_or_create_by(
      name: room_name, 
      is_private: true, 
      interlocutor_one_id: sorted_ids[0], 
      interlocutor_two_id: sorted_ids[1]
    )
 
    if room.restoring_for_one?(current_user)
      room.update(marked_delete_one: false, restored_at_one: DateTime.current)
    elsif room.restoring_for_two?(current_user)
      room.update(marked_delete_two: false, restored_at_two: DateTime.current)
    end

    render json: room, include: [:interlocutor_one, :interlocutor_two]
  end

  def destroy
    # not actually destroying... 
    if @room.interlocutor_one?(current_user)
      @room.update(marked_delete_one: true, restored_at_one: nil)
    elsif @room.interlocutor_two?(current_user)
      @room.update(marked_delete_two: true, restored_at_two: nil)
    end
    
    render json: @room
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  def verify_private_participant
    unless @room.is_private && @room.participant?(current_user)
      flash[:alert] = "You're request could not be completed."
      redirect_to_root_path
    end
  end

  def sort_users(id_one, id_two)
    [id_one, id_two].sort
  end

  def generate_name(sorted_ids)
    "privatechat_#{sorted_ids[0]}_#{sorted_ids[1]}"
  end

  def private_room_params
    params.require(:private_room).permit(:user_id)
  end
end
