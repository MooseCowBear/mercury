FactoryBot.define do
  factory :chat do
    name { "test chat" }
    is_private { false }

    trait :over_week_old do
      name { "old room" }
      updated_at { 10.days.ago }
    end

    trait :within_week_old do
      name { "newish room" }
      updated_at { 1.day.ago }
    end

    factory :old_room, traits: [:over_week_old]
    factory :new_room, traits: [:within_week_old]
  end
end
