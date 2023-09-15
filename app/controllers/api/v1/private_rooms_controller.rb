class Api::V1::PrivateRoomsController < ApplicationController
  after_action -> {current_user.update_last_active if current_user}
  
  def index
    rooms = Room.user_private_rooms(current_user)
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

    render json: room, include: [:interlocutor_one, :interlocutor_two]
  end

  def destroy
  end

  private

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
