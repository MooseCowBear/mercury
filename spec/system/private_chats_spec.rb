require 'rails_helper'

RSpec.describe 'Private Chats', type: :system, js: true do
  before(:each) do
    @user = create(:user)
    @other_user = create(:user)
    sign_in @user
  end

  it "allows user to create a new private chat and send a message" do
    visit chat_path

    find('button[aria-label="find people"]').click
    click_on "#{@other_user.username}"
    find('button[aria-label="create chat"]').click

    expected_chat_name = ["me", @other_user.username].sort.join(", ")
    expect(page).to have_content(/#{Regexp.quote(expected_chat_name)}/i).twice

    fill_in "message form", with: "hello"
    find('button[aria-label="send"]').click

    expect(page).to have_content(/hello/i)
  end

  context "existing chat" do
    before(:each) do
      chat_name = ["me", @other_user.username].sort.join(", ")
      @existing_chat = create(:chat, :private, name: chat_name)
      create(:chat_participant, user: @user, chat: @existing_chat)
      create(:chat_participant, user: @other_user, chat: @existing_chat)
      @message = create(:message, chat: @existing_chat, user: @user)
      create(:private_message_recipient, message: @message, user: @user)
      create(:private_message_recipient, message: @message, user: @other_user)
    end

    it "allows user to select an existing private chat and send a message" do
      visit chat_path

      find('button[aria-label="select chat"]', match: :first).click

      expect(page).to have_content(/#{Regexp.quote(@existing_chat.name)}/i).twice
      expect(page).to have_content(/#{Regexp.quote(@message.body)}/i)

      fill_in "message form", with: "hello"
      find('button[aria-label="send"]').click

      expect(page).to have_content(/hello/i)
    end

    it "clears notifications when user enters private chat" do
      create(:notification, user: @user, chat: @existing_chat, message: @message)

      visit chat_path
      expect(page).to have_selector('div[aria-label="notifications"]', text: "1")

      find('button[aria-label="select chat"]', match: :first).click
      expect(page).to have_selector('div[aria-label="notifications"]', text: "0")
    end

    it "allows user to block and unblock a private chat" do
      visit chat_path

      find('button[aria-label="select chat"]', match: :first).click

      find('button[aria-label="mute"]').click

      expect(page).to have_field(placeholder: "Unblock to send a message", disabled: true)

      find('button[aria-label="unmute"]').click 

      expect(page).to have_field(placeholder: "What's on your mind...")
    end
  end
end