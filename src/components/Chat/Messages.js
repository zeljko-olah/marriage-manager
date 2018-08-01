// IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';

import Message from './Message'

// COMPONENT
class Messages extends Component {
  render() {
    const { messages, user } = this.props
    return (
      <StyledMessages>
        <StyledThread>
          {messages.map((message) => {
            return (<Message
                      key={message.id}
                      message={message}
                      user={user} />)
            })
          }
        </StyledThread>
      </StyledMessages>  
    )
  }
}

// EXPORT
export default Messages

// STYLED
const StyledMessages = styled.div`
  height: 45vh;
`
const StyledThread = styled.div`
  margin: 0 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`
