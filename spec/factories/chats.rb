FactoryBot.define do
  factory :chat do

    trait :public do
      is_private { false }
      name {"public chat"}
    end

    trait :private do
      is_private { true }
    end

    trait :over_week_old do
      name { "old chat" }
      updated_at { 10.days.ago }
    end

    trait :within_week_old do
      name { "newish chat" }
      updated_at { 1.day.ago }
    end

    factory :old_chat, traits: [:over_week_old]
    factory :new_chat, traits: [:within_week_old]
  end
end
