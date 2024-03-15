FactoryBot.define do
  factory :notification do
    user { nil }
    chat { nil }
    message
  end
end
