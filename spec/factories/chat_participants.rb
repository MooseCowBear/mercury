FactoryBot.define do
  factory :chat_participant do
    user { nil }
    chat { nil }
    silence { false }

    trait :silenced do
      silence { true }
    end
  end
end
