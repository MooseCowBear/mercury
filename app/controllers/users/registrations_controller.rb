# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :check_editability, only: [:update, :destroy]
  before_action :destroy_chats, only: [:destroy]

  # DELETE /resource
  def destroy
    # soft delete
    current_user.update(deleted: true)
  end

  private

  # don't allow editing, deleting a demo account
  def check_editability
    unless current_user.editable
      flash[:alert] = "This user cannot be edited."
      redirect_to root_path
    end
  end

  def destroy_chats
    PrivateChat::DestroyService.call(current_user)
  end
end
