// IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';

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
  }
  
  render() {
    const { messages, user } = this.props
    return (
      <StyledMessages>
        <div
          className="scroll"
          ref="container">
          <StyledThread>
            {messages.map((message) => {
              return (<Message
                        key={message.id}
                        message={message}
                        user={user} />)
              })
            }
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
  & div.scroll {
    height: 45vh;
    overflow: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar { 
      display: none; 
    }
  }
`
const StyledThread = styled.div`
  margin: 0 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`
