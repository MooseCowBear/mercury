# Mercury Messaging

Started as [this](https://github.com/MooseCowBear/chat-app), refactored to allow group messaging and an updated UI.

## Local setup

Installing gems: `bundle install`

Installing esbuild: `./bin/rails javascript:install:esbuild`

Installing Tailwind: `./bin/rails css:install:tailwind`

Running the server: `bin/dev`

Also required: Postgres and Cloudinary for image messages

### How group messaging works

A user create a private group chat by selecting any number of other users.

Group chats keep track of their members with a join table called `chat_participants`.

When the user makes a request to the backend, we check if the chat with the selected users already exists. If so, we update the user’s current chat to the existing group chat. If the chat does not exist, we create it and the chat participant records for the chat.

### Identifying a group chat

Group chats are unique to their participants. So when a request for a new group chat is received, we first check whether there is an existing chat with those participants. If so, we return it. Otherwise a new chat and chat participants records are created. 

```
def find_or_create
  user_ids = params.dig(:chat_participants_attributes).map { |key| key[:user_id].to_i }
  return unless user_ids.include?(current_user.id)

  chat = Chat.with_participants(user_ids).first

  unless chat
    chat = Chat.create(params.merge(is_private: true))
  end
  chat
end
```

```
scope :with_participants,
  -> (user_ids) {
    where(
      id: ChatParticipant.select(:chat_id)
      .where(user_id: user_ids)
      .group(:chat_id)
      .having("count(user_id) = ?", user_ids.count)
    )
    .where(
      id: ChatParticipant.select(:chat_id)
      .group(:chat_id)
      .having("count(user_id) = ?", user_ids.count)
    )
  }
```

In order to keep group chats from "collapsing" into other group chats, user accounts are soft deleted. 

### Blocking behavior

Members of group chats may (un)silence or (un)block the chat. If a group chat is blocked, no notifications of new messages are sent during the time the chat is blocked. The chat participants table keeps track of whether a chat is blocked for a user with a boolean that allows us to distinguish active users of a chat.

```
has_many :active_users, -> { where(chat_participants: { silence: false }) }, through: :chat_participants, source: :user
```

We can get the users that should receive a notification that a new message has been created:

```
def notification_recipients
  chat.active_users.outside_chat(chat)
end
```

And the users who should receive the message:

```
def message_recipients
  chat.active_users
end
```

In order to prevent a user who blocked a chat from receiving messages that were sent during the time the chat was blocked even if they have unblocked it at a later time, we keep track of message recipients in a separate join table. A message recipient record is created for each user returned by `message_recipients`. Users only receive private chat messages for which they have a message recipient record, which means users will not receive messages that were sent during a time when they had the chat blocked even after they unblock the chat.

### "Deleting" messages

Message recipient records also allow users to remove a message from the messages they see without affecting other users. Instead of the message itself being deleted, a user deletes their message recipient record for that message, which removes it from their view. The message itself remains and other users will see it among their messages so long as the relevant message recipient records exist.

#### Still to do

- Prune the json information sent in responses to only what the frontend requires. 
- Remove the name requirement from private chats, can switch to a name method to reconstruct the chat name from the participants instead of keeping that information in the chat model
- Clean up frontend
- Future features: emoji responses, code snippets