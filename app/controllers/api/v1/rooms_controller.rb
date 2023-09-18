class Api::V1::RoomsController < ApplicationController
  after_action -> { current_user.update_last_active if current_user }
  before_action :set_room, only: [:show, :update]
  before_action :confirm_ownership, only: [:update]
  
  def index
    # only want to show seeded public rooms 
    # and ones that have been active in the last week
    rooms = Room.public_rooms.active 
    render json: rooms, include: [:interlocutor_one, :interlocutor_two]
  end

  def create
    room = Room.new(room_params)
    room.creator = current_user
    if room.save 
      render json: room
    else
      render json: { message: "Validations Failed", 
                    errors: room.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def show
    if @room.participant?(current_user)
      messages = @room.room_messages(current_user)
      render json: messages, include: [:user]
    else
      render json: { message: "Unauthorized", 
                    errors: ["This private chat does not belong to you"] },
                    status: 401
    end
  end

  def update
    @room.update(room_params)
    render json: @room
  end

  private 

  def room_params 
    params.require(:room).permit(:name, :is_private)
  end

  def set_room 
    @room = Room.find(params[:id])
  end

  def confirm_ownership
    unless @room.creator == current_user
      flash[:alert] = "You cannot delete a room that you did not create."
      redirect_to_root_path
    end
  end
end
