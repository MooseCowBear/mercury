# Chat App

This is an implementation of the [Odin Project's](https://www.theodinproject.com) Messaging App project. It is a fullstack messaging app with a React frontend and Rails backend. 

## Features

- Realtime messaging using WebSockets.
- Public and private chats.
- Notifications for new messages received in private chats (when user is not in the private chat at the time the message is sent).
- Ability to delete and edit messages. 
- Authentication with Devise. 

### A note about deleting private chats

Requests to delete a private chat won't actually delete the room unless the other user has deleted their account. This way the chat remains visible to the other user. If a user restarts a conversation, the messages they see in their side of the chat are those that are sent on or after the reinstatement. 

#### Built with

- Ruby on Rails
- React
- Tailwind