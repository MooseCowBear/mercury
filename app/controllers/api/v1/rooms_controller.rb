class Api::V1::RoomsController < ApplicationController
  after_action -> {current_user.update_last_active if current_user}
  before_action :set_room, only: [:destroy, :show]
  before_action :confirm_ownership, only: [:destroy]
  
  def index
    rooms = Room.public_rooms
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
    unless @room.participant?(current_user)
      render json: { message: "Unauthorized", 
                    errors: ["This private chat does not belong to you"] },
                    status: 401
      
    else
      messages = @room.room_messages(current_user)
      render json: messages, include: [:user]
    end
  end

  def destroy
    @room.destroy
    render json: @room
  end

  def update
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
