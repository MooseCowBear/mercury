require 'rails_helper'

RSpec.describe 'Navigation', type: :system, js: true do
  before(:each) do
    @user = create(:user)
    sign_in @user
    visit chat_path
  end

  it "allows users to switch between chats sidebar and people sidebar on desktop" do
    find("#people-button").click
    expect(page).to have_content(/People/i)

    find("#chat-button").click
    expect(page).to have_content(/Chat/i)
  end

  it "allows users to switch between messaes, chats sidebar, and people sidebar on mobile" do
    page.current_window.resize_to(700, 800)

    find("#chat-button").click
    expect(page).to have_content(/Chat/i)

    find("#people-button").click
    expect(page).to have_content(/People/i)

    find("#chat-button").click 
    expect(page).not_to have_content(/Chat/i)
    expect(page).not_to have_content(/People/i)
  end
end