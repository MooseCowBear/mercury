class Api::V1::ImageMessagesController < ApplicationController
  include ConfirmParticipantConcern

  before_action :confirm_participant, only: [:create]
  after_action -> { current_user.update_last_active if current_user }

  def create
    message = Message.new

    res = Cloudinary::Uploader.upload(
      message_params[:image], 
      { 
        allowed_formats: ["jpeg", "jpg", "png"], 
        folder: "Mercury", 
        upload_preset: "frcpb9q2" # for making the images small
      }
    )
  
    message.image = res["secure_url"] # if doesn't exist, will be nil. message won't save bc won't pass validations
    message.public_id = res["public_id"]

    message.user = current_user
    message.chat = @chat

    if message.save 
      Message::BroadcastService.call(message)
      render json: message.to_json(include: [:user])
    else
      render json: { message: "Validations Failed", 
                    errors: message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  private

  def message_params 
    params.permit(:chat_id, :image)
  end
end
