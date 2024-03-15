FactoryBot.define do
  factory :user do 
    sequence(:username) { |n| "person#{n}" }
    sequence(:email) { |n| "person#{n}@example.com" }
    password { "123456" }
    current_chat { nil }
  end
end
