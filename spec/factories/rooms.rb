FactoryBot.define do
  factory :room do
    name { "test room" }
    is_private { false }
    marked_delete_one { false }
    marked_delete_two { false }
    restored_at_one { nil }
    restored_at_two { nil }
    creator { nil }
    interlocutor_one { nil }
    interlocutor_two { nil }

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
