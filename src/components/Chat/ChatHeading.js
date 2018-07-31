import React from 'react'
import styled from 'styled-components';

const ChatHeading = ({users}) => {
  let status = 'Wait a minute, please!'
  if (users) {
    status = users.map(user => {
      return <p key={user}>{user} is <span className='on'>online</span>!</p>
    })
  }

  return (
    <div>
      <StyledChatHeading>
        { status }
      </StyledChatHeading>
    </div>
  )
}

export default ChatHeading

const StyledChatHeading = styled.div`
display: flex;
justify-content: center;

& h3 {
    flex-basis: 40%;
    border: 1px solid tomato;
    padding: 5px;
    margin: 0 5px;
    border-radius: 10px;
    background: rgba(0,0,0, 0.2);
  }

  & span {
    display: inline-block;
    font-weight: bold;
    margin-left: 5px;
  }

  & span.off {
    color: tomato;
  }

  & span.on {
    color: LightGreen;
  }

`
