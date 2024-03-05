require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user1 = create(:user)
  end

  it "is valid with valid attributes" do
    expect(@user1).to be_valid
  end

  it "has a unique username" do
    user2 = build(:user, email: "larry@test.com")
    expect(user2).to_not be_valid
  end

  it "has a username" do
    user2 = build(:user, email: "randy@test.com", username: "")
    expect(user2).to_not be_valid
  end

  it "has a username less than 21 characters" do
    user2 = build(:user, email: "sally@test.com", username: "a" * 21)
    expect(user2).to_not be_valid
  end

  it "strips username of whitespace" do
    user2 = create(:user, email: "zoe@test.com", username: "  zoe  ")
    expect(user2.username).to eq("zoe")
  end

  it "lowercases username" do
    user2 = create(:user, email: "howie@test.com", username: "HOWIE")
    expect(user2.username).to eq("howie")
  end

  describe ".other_users" do
    before(:each) do
      @user2 = create(:user, email: "harry@test.com", username: "harry")
    end

    it "excludes user" do
      expect(User.other_users(@user1)).not_to include(@user1)
    end

    it "includes all other users" do
      expect(User.other_users(@user1)).to include(@user2)
    end
  end
end
