// IMPORTS
import React, { Fragment } from 'react'

import Loading from '../../components/UI/Loading'
import Avatar from '../../components/user/Avatar'

import ChatIcon from 'react-icons/lib/md/forum'

import { StyledShadow } from '../../styles/section'

// COMPONENT
const ChatInfo = ({
  partner,
  partnerChatIsOpen,
  partnerOnline, 
  newMessages, 
  toggleChat,
  loading,
  users,
  newImportantMessages,
  partnerLastMessage
 }) => {
  return (
    <Fragment>
    
      { /* CHAT ICON */ }
      <StyledShadow>
        <StyledShadow onClick={ () => {toggleChat(partnerChatIsOpen)} }>
          <h2><ChatIcon/></h2>  
        </StyledShadow>
      </StyledShadow>
      { !users.length ? (<Loading/>) : (
        <Fragment>
          <div>

            { /* STATUS */ }
            <h3>{partner.name} is  
            <span className={partnerOnline ? 'chat-status online' :'chat-status offline'}>
            { partnerOnline ? ' online': ' offline' }
            </span></h3>

            { /* CHAT WINDOW STATUS */ }
            <h4>
              {partner.name}'s chat window is
              <span className={partnerChatIsOpen ? 'partner-chat open':'partner-chat closed'}>
                { partnerChatIsOpen ? ' opened' : ' closed' }
              </span>
            </h4>

            { /* NEW MESSAGES */ }
            { newMessages > 0 ? (
              <h4>You have
              <span className="new-messages">
                {' ' + newMessages + ' new '} 
              </span>
                { newMessages === 1 && 'message'}
                { newMessages > 1 && 'messages'}
              </h4>
            ) : (
              <h4>No new messages.</h4>
            ) }

            { /* IMPORTANT MESSAGES */ }
            { newImportantMessages > 0 ? (
              <h4>And
              <span className="important-messages">
              {'  ' + newImportantMessages + ' important '} 
            </span>
              { newImportantMessages === 1 && 'message'}
              { newImportantMessages > 1 && 'messages'}</h4>
            ) : null }
          </div>
          
          { /* PARTNER STATUS AVATAR */ }
          <div className={partnerOnline ? 'avatar-wrapper online' :'avatar-wrapper offline'}>
            <Avatar
              width={'40px'}
              height={'40px'}
              name={partner.name}
              src={partner.avatar} /> 
          </div>
        </Fragment>  
      ) }

      { /* LAST PARTNER MESSAGE */ }
      { loading ? (
        <div className="last-message">
          <Loading />
        </div>
        ) : (
        <div className="last-message">
          <h4>
            Last message to you:
            { partnerLastMessage && partnerLastMessage.createdAtFormatted ? (
              <span className="last-message-time">
                {partnerLastMessage.createdAtFormatted}                        
              </span>
            ) : (
              null
            )}
          </h4>
          <StyledShadow>
            { partnerLastMessage ? (
            <p>{partnerLastMessage.text && (
              '"' + partnerLastMessage.text.substr(0, 150) + (partnerLastMessage.text.length > 150 ? '..."' : '"')
              ) }</p>
            ) : (
              <p>No messages.</p>
            ) }

          </StyledShadow>
      </div>
      ) }
    </Fragment>
  )
}

// EXPORT
export default ChatInfo
