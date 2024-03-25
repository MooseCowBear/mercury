require 'rails_helper'

RSpec.describe 'Public Chats', type: :system, js: true do
  before(:each) do
    @user = create(:user)
    sign_in @user
  end

  context "new public chats" do
    it "allows user to create a new public chat and send a message" do
      visit chat_path
      find('button[aria-label="create new public chat"]').click

      fill_in "new-chat-name", with: "new chat"
      click_on("create")

      expect(page).to have_current_path(chat_path)
      expect(page).to have_content(/new chat/i).twice

      fill_in "message form", with: "hello"
      find('button[aria-label="send"]').click

      expect(page).to have_content(/hello/i)
    end
  end

  context "existing public chats" do
    before(:each) do
      @existing_chat = create(:chat, :public, name: "existing chat", always_visible: true)
    end

    it "allows user to select an existing public chat and send a message" do
      visit chat_path

      find('button[aria-label="select chat"]', match: :first).click

      expect(page).to have_content(/existing chat/i).twice

      fill_in "message form", with: "hello"
      find('button[aria-label="send"]').click

      expect(page).to have_content(/hello/i)
    end
  end
end