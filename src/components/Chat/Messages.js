import React, { Component } from 'react';
import styled from 'styled-components';

import Message from './Message'

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

export default Messages

const StyledMessages = styled.div`
  height: 45vh;
`
const StyledThread = styled.div`
  margin: 0 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  & div.message-wrapper {
    padding: 5px;
  }

  & div.message-inner {
    border: 1px solid white;
    border-radius: 10px;
    padding: 5px 10px;
    background: #efe;
    color: white;
    display:inline-block;
  }

  & div.left {
    text-align: right;
  }
  & div.right {
    text-align: left;
  }

  & div.time {
    color: tomato;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }

  & div.message {
    padding: 3px 0;
    color: #333;
    font-size: 16px;
    // font-weight: bold;
    text-align: left;
  }

  & div.sender {
    text-align: right;
    color: #777;
    font-style: italic;
  }
`
