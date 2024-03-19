chats = [
          {name: "welcome"}, 
          {name: "music"}, 
          {name: "sports"}, 
          {name: "art"}, 
          {name: "pets"}
        ]

chats.each do |chat|
  Chat.create(chat.merge(always_visible: true))
end

users = ["alice", "bob", "charlie", "darrell", "evie", "fred"]

users.each do |user|
  attributes = { 
    email: "#{user}@fake.com",
    username: user, 
    password: (0...25).map { ('a'..'z').to_a[rand(26)] }.join, 
    editable: false 
  }
  User.create(attributes)
end