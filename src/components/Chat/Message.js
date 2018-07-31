import React from 'react'

const Message = ({message, user}) => {
  let messageClass
  if (message.from === user.name ) {
    messageClass = "message-wrapper left"
  } else {
    messageClass = "message-wrapper right"
  }
  return (
    <div className={messageClass}>
      <div className="message-inner">
        <div className="time">{message.createdAt}</div>
        <div>
          <div className="message">{message.text}</div>
          <div className="sender">{message.from}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
