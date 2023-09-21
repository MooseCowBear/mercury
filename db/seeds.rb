Room.destroy_all
User.destroy_all
Message.destroy_all
Notification.destroy_all

rooms = [
          {name: "welcome"}, 
          {name: "music"}, 
          {name: "sports"}, 
          {name: "art"}, 
          {name: "pets"}
        ]

rooms.each do |room|
  Room.create(room)
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