import React from 'react'
import styled from 'styled-components'

import Aux from '../../hoc/Aux'

import Avatar from '../../components/user/Avatar'

const ChatHeading = ({users, user}) => {
  let sender;
  let receiver;
  if (users && user) {
    sender = users.find(name => name != user.name)
  }

  receiver = user ? user.name : null

  return (
    <div>
    <StyledChatHeading>
      <div className="user">
        { sender ? (
          <Aux>
            <Avatar src={"img/users/marina.jpg"}/>
            <span className="sender">{sender + ":)"}</span> 
          </Aux>
        ) : (
          <Aux>
            <Avatar src={"img/users/default-avatar.png"} />
            <span className="sender">{ sender }</span>
          </Aux> 
        ) }
      </div>  
      <div className="user">
        <span className="receiver">{"<3"} {receiver}</span> 
        <Avatar 
          src={"img/users/zeljko.jpg"} />
      </div>
         
        </StyledChatHeading>
    </div>
  )
}

export default ChatHeading

const StyledChatHeading = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
border-bottom: 2px solid aquamarine;

  & span {
    display: inline-block;
    font-weight: bold;
    font-size: 15px;
    margin: 0 10px;
  }

  span.receiver {
    color: CornflowerBlue;
  }
  span.sender {
    color: Violet;
  }

  & div.user {
    flex-basis: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & span.off {
    color: tomato;
  }

  & span.on {
    color: LightGreen;
  }

`
