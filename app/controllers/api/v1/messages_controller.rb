class Api::V1::MessagesController < ApplicationController
  include ConfirmParticipantConcern

  before_action :set_message, only: [:update]
  before_action :confirm_participant, only: [:create]
  before_action :confirm_text_message, only: [:update]
  after_action -> { current_user.update_last_active if current_user }

  def index
    messages = current_user.current_chat.chat_messages(current_user)
    render json: messages, include: [:user], methods: [:is_private]
  end

  def create
    message = Message.new(message_params)
    message.user = current_user

    if message.save 
      Notifications::CreateService.call(message)
      Message::BroadcastService.call(message)
      render json: message.to_json(include: [:user], methods: [:is_private])
    else
      render json: { message: "Validations Failed", 
                    errors: message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  def update
    if @message.update(message_params) 
      Message::BroadcastService.call(@message)
      render json: @message.to_json(include: [:user], methods: [:is_private])
    else
      render json: { message: "Validations Failed", 
                    errors: @message.errors.full_messages }, 
                    status: :unprocessable_entity
    end
  end

  # destroy action removes a message from the set of private messages that a user sees
  # after a delete, also want to remove the message preview. 
  # this requires broadcasting the chat but only to current user
  def destroy
    recipient_record = PrivateMessageRecipient.find_by(user_id: current_user.id, message_id: params[:id])
    if recipient_record
      recipient_record.destroy
      Message::BroadcastService.call(recipient_record.message, current_user)
      render json: { head: :ok }
    else 
      render json: { head: :unprocessable_entity }
    end
  end

  private 

  def message_params 
    params.require(:message).permit(:body, :chat_id, :image)
  end

  def set_message
    @message = current_user.messages.find(params[:id])
  end

  def confirm_text_message
    unless @message.body
      flash[:alert] = "Only text messages can be edited."
      redirect_to chat_path
    end
  end
end
