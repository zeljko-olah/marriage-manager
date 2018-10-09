// IMPORTS
import React from 'react'
import Avatar from './../components/user/Avatar'

// Handle avatars helper
export const handleAvatars = (reminder, users) => {
  if (!users.length) {
    return null
  } else {
    const user = reminder.who
    let avatar
    if (user === 'both') {
      avatar = [users[0], users[1]]
    } else {
      avatar = [users.find(u => u.name === user)]
    }

    return avatar.map(a => (
      <Avatar
        key={a.id}
        name={a.name}
        src={a.avatar} />
    ))
  }
}