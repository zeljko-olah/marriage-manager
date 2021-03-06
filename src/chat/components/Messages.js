// IMPORTS
import React, { Component } from 'react'
import styled from 'styled-components'

import Message from './Message'

// COMPONENT
class Messages extends Component {

  componentDidMount() {
		this.scrollDown()
  }
  
  componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}

  scrollDown = () => {
    const { container } = this.refs
    container.scrollTop = container.scrollHeight
    this.wrapper.scrollTop = this.wrapper.scrollHeight
  }
  
  render() {
    const { messages, user, markAsRead, removeImportant, typingUser, isTyping, close } = this.props
    let sender
    let prevSender = ''
    let pointer = true
    return (
      <StyledMessages innerRef={wrapper => this.wrapper = wrapper}>
        <div
          className="scroll"
          ref="container">
          <StyledThread>
            {messages ? messages.map((message) => {
              // Logic for styling messages clouds
              sender = message.from
              if (prevSender !== sender) {
                prevSender = sender
                pointer = true
              } else {
                pointer = false
              }     
                     
              return (<Message
                        key={message._id}
                        message={message}
                        user={user}
                        pointer={pointer}
                        markAsRead={markAsRead}
                        removeImportant={removeImportant}
                        close={close} />)
              }) : (
                <p>Chat history is not available</p>
              )
            }
            {isTyping ? (
              <Message
                stylingClass={"typing"}
                message={{
                  text: `${typingUser} is typing...`,
                  type: 'message'
                }}
                user={{name: typingUser}}
                pointer={true} />
            ) : null}

          </StyledThread>
        </div>
      </StyledMessages>  
    )
  }
}

// EXPORT
export default Messages

// STYLED
const StyledMessages = styled.div`
  position: relative;
  padding: 10px 0;
  ::-webkit-scrollbar { 
    display: none;
  }
  @media (max-width: 768px) {
    flex-grow: 1;
    overflow-y: scroll;
  }
  & div.scroll {
    overflow-y: scroll;
    height: 45vh;
    @media (max-width: 768px) {
      height: auto;
    }
  }
`
const StyledThread = styled.div`
  margin: 0 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`
