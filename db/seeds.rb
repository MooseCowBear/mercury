# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Room.destroy_all
User.destroy_all

rooms = [
          {name: "Welcome"}, 
          {name: "Music"}, 
          {name: "Sports"}, 
          {name: "Art"}, 
          {name: "Pets"}
        ]

rooms.each do |room|
  Room.create(room)
end

users = ["alice", "bob", "charlie", "darrell", "evie", "fred"]

users.each do |user|
  attributes = {email: "#{user}@fake.com", username: user, password: "123456"}
  User.create(attributes)
end