// IMPORTS
import React, {Component, Fragment} from 'react'

// Components
import Loading from '../components/UI/Loading'
import Avatar from '../components/user/Avatar'

// Styled components
import styled from 'styled-components'
import * as colors from '../styles/variables'
import {StyledSection, StyledMainHeading, StyledMainContent, StyledShadow} from '../styles/section'

import { connect } from 'react-redux'

// Selectors
import { selectAllRoomUsers, selectPartner, selectPartnerLastMessage } from '../store/selectors/chat'

// COMPONENT
class Welcome extends Component {

  render () {
    const { user, users, activeUsers, partnerChatIsOpen, partner, partnerLastMessage } = this.props
    let partnerOnline = false
    if (activeUsers.length === 2) {
      partnerOnline = true
    }
    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <h1>Welcome { user.name }</h1>
        </StyledMainHeading>
  
        <StyledMainContent>
          <StyledWelcome>
            <StyledShadow>
              <StyledShadow>
                <StyledChatInfo>
                  { !users.length ? (<Loading/>) : (
                    <Fragment>
                      <div>
                        <h3>{partner.name} is  
                        <span className={partnerOnline ? 'chat-status online' :'chat-status offline'}>
                        { partnerOnline ? ' online': ' offline' }
                        </span></h3>
                        <h4>
                          {partner.name}'s chat window is
                          <span className={partnerChatIsOpen ? 'partner-chat open':'partner-chat closed'}>
                            { partnerChatIsOpen ? ' opened' : ' closed' }.
                          </span>
                        </h4>
                      </div>    
                      <div className={partnerOnline ? 'avatar-wrapper online' :'avatar-wrapper offline'}>
                        <Avatar
                          width={'40px'}
                          height={'40px'}
                          name={partner.name}
                          src={partner.avatar} /> 
                      </div>
                    </Fragment>  
                  ) }
                  <div className="last-message">
                    <h4>Last message to you:</h4>
                    <StyledShadow>
                      { partnerLastMessage ? (
                      <p>{partnerLastMessage.text}</p>
                      ) : (
                        <p>No meesages.</p>
                      ) }

                    </StyledShadow>
                  </div>
                </StyledChatInfo>
              </StyledShadow>
            </StyledShadow>
            <StyledShadow>
              <StyledShadow>
                <h2>Todos</h2>          
              </StyledShadow>
            </StyledShadow>
            <StyledShadow>
              <StyledShadow>
                <h2>Reminders</h2>          
              </StyledShadow>
            </StyledShadow>
            <StyledShadow>
              <StyledShadow>
                <h2>Location</h2>          
              </StyledShadow>
            </StyledShadow>
          </StyledWelcome>
        </StyledMainContent>
      </StyledSection>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    users: selectAllRoomUsers(state),
    activeUsers: state.chat.activeUsers,
    partner: selectPartner(state),
    partnerChatIsOpen: state.chat.partnerChatOpen,
    partnerLastMessage: selectPartnerLastMessage(state)
  }
}

// EXPORT
export default connect( mapStateToProps )( Welcome )

const StyledWelcome = styled.div`

& h3,
& h4 {
    color: ${colors.prim_light};
    font-style: italic;
    text-transform: uppercase;
  }
`
const StyledChatInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

& h3 {
    color: ${colors.prim_light};
    font-style: italic;
  }

& .avatar-wrapper {
  border: 10px solid ${colors.sec_color};
  border-radius: 50%;
}

& .avatar-wrapper.online {
  border: 10px solid ${colors.success};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
& .avatar-wrapper.offline {
  border: 10px solid ${colors.sec_color};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

& .chat-status.online {
  font-size: 25px;
  color: ${colors.success};
}
& .chat-status.offline {
  font-size: 20px;
  color: ${colors.sec_color};
}

& .partner-chat.open {
  font-size: 15px;
  color: ${colors.boy_color};
}
& .partner-chat.closed {
  font-size: 15px;
  color: ${colors.girl_color};
}

& .last-message {
  flex-basis: 300px;
  color: ${colors.prim_color};
  font-style: italic;
  font-weight: bold;
}
`
