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
    room = Room.private_room_create(current_user, params[:user_id])

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

  def private_room_params
    params.require(:private_room).permit(:user_id)
  end
end
