FactoryBot.define do
  factory :user do
    username { "joe" }
    email { "joe@test.com" }
    password { "123456" }
    current_room { nil }
  end
end
