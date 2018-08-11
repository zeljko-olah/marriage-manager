import React, {Fragment} from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

import SaveIcon from  'react-icons/lib/md/save'
import CloseIcon from  'react-icons/lib/md/close'
import DeleteIcon from  'react-icons/lib/md/delete'
import DoneIcon from  'react-icons/lib/md/done'

import Avatar from '../../components/user/Avatar'

const ChatHeading = ({
  users,
  user,
  close,
  saveChatHistory,
  deleteChatHistory,
  markAllRead
 }) => {
  let sender;
  let receiver;
  if (users && user) {
    sender = users.find(u => u.name !== user.name)
  }

  receiver = user ? user : null

  return (
    <div>
      <StyledBar className="header-bar">
        <div className="mark-as">
          <div className="icon-wrapper">
            <i className="done-icon"><DoneIcon onClick={markAllRead} /></i>
          </div>
        </div>
        <div>
          <div className="icon-wrapper" onClick={saveChatHistory}>
            <span className="save"><i><SaveIcon/></i></span>
          </div>
          <div className="icon-wrapper" onClick={() => {deleteChatHistory(user, users)}}>
            <span><i><DeleteIcon/></i></span>
          </div>
          <div className="close-wrapper" onClick={close}>
            <span><i><CloseIcon/></i></span>
          </div>
        </div>
        
      </StyledBar>
      <StyledChatHeading>
        <div className="user">
          { sender ? (
            <Fragment>
              <Avatar
                src={sender.avatar}
                user={sender}/>
              <span className="sender">{sender.name + ":)"}</span> 
            </Fragment>
          ) : (
            <Fragment>
              <Avatar
                src={"uploads/users/default-avatar.png"} />
              <span className="offline">Offline</span>
            </Fragment> 
          ) }
        </div>  
        <div className="user">
          <span className="receiver">{"<3"} {receiver.name}</span> 
          <Avatar 
            src={receiver.avatar}
            user={receiver} />
        </div>
         
      </StyledChatHeading>
    </div>
  )
}

export default ChatHeading

const StyledBar = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  background: ${colors.sec_grad};
  padding: 5px 0px;

  & div.mark-as {
    flex-grow: 1;
    margin-left: 60px;
  }

  & div.icon-wrapper,
  & div.close-wrapper {
    display: inline-block;
    position: relative;
    padding-right: 10px;
  }

  & div.icon-wrapper {
    padding-right: 20px;
  }

  & div.icon-wrapper .done-icon:hover::after {
    content: 'Mark all messages as read';
    color: ${colors.prim_font};
    font-style: normal;
    background-color: #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    margin-left: 10px;
  }

  & i svg {
    font-size: 30px;
    color: ${colors.prim_font};
    transition: all 0.2s ease-in;

    &:hover {
      color: ${colors.sec_color};
      transform: scale(1.2);
      cursor: pointer;
    }
  }
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
