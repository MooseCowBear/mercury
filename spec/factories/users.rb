FactoryBot.define do
  factory :user do
    username { "joe" }
    email { "joe@test.com" }
    password { "123456" }
    # association :current_room, factory :room
  end
end
