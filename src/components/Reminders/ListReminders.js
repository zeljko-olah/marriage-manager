import React, { Component } from 'react'

import moment from 'moment'

import Avatar from '../../components/user/Avatar'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../../styles/section'

const formatReminderDate = (timestamp) => {
  return moment(timestamp).format('MMM Do')
}

const formatReminderTime = (timestamp) => {
  return moment(timestamp).format('HH:mm')
}

const handleAvatars = (reminder, users) => {
  if (!users.length) {
    return null
  } else {
    const user = reminder.who
    let avatar
    if (user === 'both') {
      avatar = [users[0], users[1]]
    } else {
      avatar = [users.find(u => u.name === user)]
    }

    return avatar.map(a => (
      <Avatar
        key={a.id}
        name={a.name}
        src={a.avatar} />
    ))
  }
}

class ListReminders extends Component {
  render() {

    const { reminderClass, reminders, users } = this.props
    return (
      <StyledReminders> 
            
        { reminders.map(reminder => {
          return (
            <div
            className="reminder-box"
            key={reminder.id}>
              <div className={reminderClass}>
                <div className="reminder-avatar">
                  {handleAvatars(reminder, users )}
                </div>
                <StyledShadow>
                  <p className="reminder-title">{reminder.title}</p>
                </StyledShadow>
                <p className="reminder-date">{formatReminderDate(reminder.date)}</p>
                <StyledShadow>
                  <p className="reminder-time">{formatReminderTime(reminder.date)}</p>
                </StyledShadow>
              </div>
            </div>
          )
        }) }
      </StyledReminders> 
    )
  }
}

export default ListReminders

const StyledReminders = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  & .reminder-box { 
    padding: 15px 10px;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    & > div {
      position: relative;
      box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.7);
      flex: 1;
      border: 1px solid ${colors.prim_color};
      display: flex;
      justify-content: space-between;

      & > div {
        flex-basis: 40%;
      }
    }
  }

  & .today {
    background: ${colors.boy_color};
  }

  & .next {
    background: ${colors.overlay};
  }

  & .expired {
    background: ${colors.backdrop};
    color: ${colors.prim_font};
  }

  & .reminder-title {
    color: ${colors.prim_color};
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }

  & .reminder-date {
    color: ${colors.sec_light};
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding: 5px;
  }

  & .reminder-time {
    color: ${colors.prim_light};
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }

  & .reminder-avatar {
    position: absolute;
    top: -25px;
    left: 10px;
    display: flex;
    & div {
      width: 50px;
      border: 2px solid ${colors.prim_color};
      border-radius: 50px;

    }
  }

  & .separator {
    width: 80%;
    margin: 0 auto 20px;
    border: 1px solid ${colors.prim_color};
  }
`
