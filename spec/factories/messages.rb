FactoryBot.define do
  factory :message do
    body { "i am a test message" }
    user 
    room 

    trait :over_week_old do
      created_at { 10.days.ago }
    end

    factory :old_message, traits: [:over_week_old]
  end
end
