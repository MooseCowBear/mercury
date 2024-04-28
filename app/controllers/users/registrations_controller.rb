# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :check_editability, only: [:update, :destroy]
  before_action :destroy_chats, only: [:destroy]

  # DELETE /resource
  def destroy
    # soft delete
    current_user.update(deleted: true)
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message! :notice, :destroyed
    yield resource if block_given?
    respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name), status: Devise.responder.redirect_status }
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
