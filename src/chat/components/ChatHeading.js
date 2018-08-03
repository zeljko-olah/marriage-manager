import React from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'


import Aux from '../../hoc/Aux'

import Avatar from '../../components/user/Avatar'

const ChatHeading = ({users, user}) => {
  let sender;
  let receiver;
  if (users && user) {
    sender = users.find(u => u.name !== user.name)
  }

  receiver = user ? user : null

  return (
    <div>
      <StyledBar className="header-bar"></StyledBar>
      <StyledChatHeading>
        <div className="user">
          { sender ? (
            <Aux>
              <Avatar src={sender.avatar}/>
              <span className="sender">{sender.name + ":)"}</span> 
            </Aux>
          ) : (
            <Aux>
              <Avatar src={"uploads/users/default-avatar.png"} />
              <span className="offline">Offline</span>
            </Aux> 
          ) }
        </div>  
        <div className="user">
          <span className="receiver">{"<3"} {receiver.name}</span> 
          <Avatar 
            src={receiver.avatar} />
        </div>
         
      </StyledChatHeading>
    </div>
  )
}

export default ChatHeading

const StyledBar = styled.div`
  height: 50px;
  background: ${colors.sec_grad};
`

const StyledChatHeading = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;

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
  span.offline {
    color: ${colors.sec_color};
  }

  & div.user {
    flex-basis: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  & span.on {
    color: LightGreen;
  }
`
