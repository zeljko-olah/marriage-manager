import React from 'react'
import styled from 'styled-components'
import { 
  prim_color,
  prim_light,
  prim_font,
  sec_color,
  sec_light,
  sec_font
 } from '../../styles/variables'

const Message = ({message, user}) => {
  let messageClass
  if (message.from === user.name ) {
    messageClass = "message-wrapper right"
  } else {
    messageClass = "message-wrapper left"
  }
  return (
    <StyledMessage>
      <div className={messageClass}>
        <div className="sender">{message.from}</div>
        <div className="message-outer">
          <div className="time">{message.createdAt}</div>
          <div className="message-inner">
              <div className="message dont-break-out">{message.text}</div>
          </div>
        </div>
      </div>
    </StyledMessage>
  )
}

export default Message

const StyledMessage = styled.div`

& div.message-wrapper {
  padding: 5px;
}

& div.left {
  text-align: left;
}

& div.right {
  text-align: right;
}

& div.message-outer {
  display: flex;
  align-items: center;
  &:hover .time {
    opacity: 1;
  }
}

& div.left .message-outer {
  justify-content: flex-start;
}

& div.right .message-outer {
  justify-content: flex-end;
}

& div.left .time {
  order: 2;
}

& div.message-inner {
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px 10px;
  color: white;
  display:inline-block;
}

& div.left .message-inner {
  order: 1;
  border: 3px solid ${sec_color};
  background: ${sec_light};
}

& div.right .message-inner {
  border: 3px solid ${prim_color};
  background: ${prim_light};
}

& div.time {
  color: ${sec_font};
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin: 0 10px 0 10px;
  opacity: 0;
}

& div.message {
  padding: 3px 0;
  color: ${prim_font};
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

& div.sender {
  color: #FFF;
  font-style: italic;
}

.dont-break-out {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
`
