require 'rails_helper'

RSpec.describe 'Messages', type: :system, js: true do
  before(:each) do
    allow_any_instance_of(ActionController::Base).to receive(:protect_against_forgery?).and_return(true)
    @chat = create(:chat, :public, always_visible: true)
    @user = create(:user, current_chat_id: @chat.id)
    sign_in @user
  end

  it "allows user to edit text message" do
    existing_message = create(:message, user: @user, chat: @chat)

    visit chat_path 

    expect(page).to have_content(/#{Regexp.quote(existing_message.body)}/i)
    click_on "#{existing_message.body}"

    fill_in "edit-message", with: "new message body"

    find("body").click # click something outside to trigger on blur

    expect(page).to have_content(/new message body/i)
  end

  it "allows user to send a text message to current chat" do
    visit chat_path

    find('button[aria-label="select chat"]', match: :first).click # why do i need this? user is already in the chat

    fill_in "message form", with: "hello"
    find('button[aria-label="send"]').click

    expect(page).to have_current_path(chat_path)
    expect(page).to have_content(/hello/i) 
  end

  it "allows user to send an image message to current chat" do
    visit chat_path

    find('button[aria-label="select chat"]', match: :first).click

    find('button[aria-label="add image"]').click

    attach_file("file", "spec/fixtures/leaf.jpeg", make_visible: true)

    find('button[aria-label="send"]').click

    # need to find the message somehow...
    expect(page).to have_css("img") 
  end
end