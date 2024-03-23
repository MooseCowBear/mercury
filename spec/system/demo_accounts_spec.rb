require 'rails_helper'

RSpec.describe 'Demo Accounts', type: :system, js: true do
  before(:each) do
    @alice = create(:user, username: "alice", email: "alice@fake.com", editable: false)
    @bob = create(:user, username: "bob", email: "bob@fake.com", editable: false)
  end

  it "allows users to log in as alice" do
    visit new_user_session_path
    click_on "Sign in as Alice"

    expect has_current_path?(chat_path)
  end

  it "allows users to log in as bob" do
    visit new_user_session_path
    click_on "Sign in as Bob"

    expect has_current_path?(chat_path)
  end

  it "does not allow editing alice's account" do
    sign_in @alice
    visit edit_user_registration_path

    click_on "Update"
    expect has_current_path?(root_path)
    expect(page).to have_content("This user cannot be edited.")
  end

  it "does not allow editing bob's account" do
    sign_in @bob
    visit edit_user_registration_path

    click_on "Update"
    expect has_current_path?(root_path)
    expect(page).to have_content("This user cannot be edited.")
  end
end