class Api::V1::RoomsController < ApplicationController
  after_action -> {current_user.update_last_active if current_user}
  
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
    room = Room.find(params[:id])

    unless room.participant?(current_user)
      render json: { message: "Unauthorized", 
                    errors: ["This private chat does not belong to you"] },
                    status: 401
      
    else
      messages = room.messages.order(created_at: :asc)
      render json: messages, include: [:user]
    end
  end

  def destroy
  end

  def update
  end

  private 

  def room_params 
    params.require(:room).permit(:name, :is_private)
  end
end
