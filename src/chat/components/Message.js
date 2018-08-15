import React, {Component} from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

import CheckIcon from 'react-icons/lib/md/visibility'
import ImportantIcon from 'react-icons/lib/md/warning'

class Message extends Component {
  state = {
    selected: false
  }

  handleSelected = (id, from) => {
    const { user, markAsRead } = this.props
    if (user.name !== from) {
      markAsRead(id, from)
      this.setState((prevState) => {
        return {
          selected: !prevState.selected
        }
      })
    }
  }

  handleImportant = (id, from) => {
    const { user, removeImportant } = this.props
    if (user.name !== from) {
      removeImportant(id, from)
    }
  }
  
  render () {
    const { selected } = this.state
    const { message, user, pointer, stylingClass } = this.props
    // Create message CSS class depending on who is sending the message
    let messageClass
    if (message.from === user.name ) {
      messageClass = "message-wrapper right"
    } else if(message.from === 'Admin') {
      messageClass = "message-wrapper admin"
    } else {
      messageClass = "message-wrapper left"
    }
    
    // Make linebreaks functionality posible
    const checkLineBreaks = message.text.includes('\n')
    let formattedMessage
    if (checkLineBreaks) {
      formattedMessage = message.text.split('\n')
      .map((part, index) => {
        return <div key={part + index} className="message dont-break-out"> {part} </div>
      })
    } else {
      formattedMessage = <div className="message dont-break-out"> {message.text} </div>
    }
  
    return (
      <StyledMessage pointer={pointer} typingClass={stylingClass}>
        <div className={messageClass}>
          <div className="message-outer">
            <div className="time">{message.createdAt}</div>
            <div className="message-inner">
                {formattedMessage}
                {message.unread ? (
                  <span
                    className={selected ? 'marked': 'unread'}
                    onClick={() => {this.handleSelected(message.id, message.from)}}>
                    <CheckIcon />
                  </span>) : null}
                {message.important ? (
                  <span
                    className="important"
                    onClick={() => {this.handleImportant(message.id, message.from)}}>
                    <ImportantIcon />
                  </span>) : null}
            </div>
          </div>
        </div>
      </StyledMessage>
    )
  }
}

export default Message

const StyledMessage = styled.div`

& div.message-wrapper {
  padding: 6px 5px;
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

& div.admin .message-outer {
  justify-content: center;
}

& div.left .time {
  order: 2;
}

& div.message-inner {
  max-width: 500px;
  position: relative;
  display:inline-block;
  border-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px 15px;
  &:after {
    content: '';
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    border-bottom: 10px solid ${colors.sec_light};
    transform: skewX(-60deg);
    ${ props => {
      return !props.pointer && 'display: none;' 
    }}
  }
}

& div.left .message-inner {
  order: 1;
  background: ${colors.sec_light};
  &:after {
    transform: skewX(60deg);
    top: -18px;
    left: -10px;
  }
}

& div.right .message-inner {
  background: ${colors.prim_light};
  &:after {
    border-bottom: 10px solid ${colors.prim_light};
    top: -18px;
    right: -10px;
  }
}

& div.admin .message-inner {
  order: 1;
  background: #ddd;
  &:after {
    border-bottom: 10px solid #ddd;
    transform: skewX(-60deg);
    top: -18px;
    left: 25px;
  }
}

& div.time {
  color: ${colors.prim_font};
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  margin: 0 10px 0 10px;
  opacity: 0;
}

& div.message {
  padding: 3px 0;
  color: ${colors.prim_font};
  font-family: PT mono, sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
}

& div.sender {
  color: #FFF;
  font-style: italic;
}

& .unread,
& .marked,
& .important {
  display: inline-block;
  position: absolute;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  background: #efefef;
  border-radius: 5px;
  padding: 5px;
  line-height: 10px;
  cursor: pointer;
}

& .left .important {
  bottom: -5px;
  right: -20px;
}
& .right .important {
  bottom: -5px;
  left: -20px;
}
& .important {
  color: ${colors.sec_color}; 
  background-color: black; 
  font-size: 20px;
  cursor: pointer;
}
& .left .unread,
& .left .marked {
  bottom: -5px;
  right: -20px;
}

& .unread {
  color: tomato;  
  background-color: ${colors.overlay}; 
  z-index: 500;
}
& .marked {
  color: ${colors.prim_color};  
  background-color ${colors.overlay}; 
}

${props => {
  return props.typingClass ? `
  & div.left .message-inner:last-child {
    position: absolute;
    bottom: 0;
    left: 50px;
    background: ${colors.sec_light};
  }
  `
  : null
}}

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
