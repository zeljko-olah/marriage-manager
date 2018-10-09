// IMPORTS
import React from 'react'
import moment from 'moment'

import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledShadow } from '../../styles/section'

import InfoIcon from 'react-icons/lib/md/info'
import RemoveIcon from 'react-icons/lib/md/remove-circle'
import TimerIcon from 'react-icons/lib/md/timer'

import { handleAvatars } from '../../shared/helpers'

// Format date and time helpers
const formatReminderDate = (timestamp) => {
  return moment(timestamp).format('MMM Do')
}

const formatReminderTime = (timestamp) => {
  return moment(timestamp).format('HH:mm')
}

// COMPONENT
export default ({reminder, reminderClass, users, removeReminder, setTimer}) => {
  return (
    <StyledReminder>
      <div className={reminder.date < moment().valueOf() ? 'expired' : reminderClass}>

        { /* AVATARS */ }
        <div className="reminder-avatar">
          {handleAvatars(reminder, users )}
        </div>

        { /* REMINDER TITLE */ }
        <StyledShadow className="reminder-title-wrapper">
          <p className="reminder-title">{reminder.title}</p>

          { /* REMINDER INDO AND DESCRIPTION */ }
          <div className="reminder-info-wrapper">
            <span className="reminder-info-icon"><InfoIcon/></span>
            <div className="reminder-info">
              {reminder.description}
            </div>
          </div>
        </StyledShadow>

        { /* REMINDER DATE */ }
        <div className="reminder-date-wrapper">
          <p className="reminder-date">{formatReminderDate(reminder.date)}</p>
        </div>
        <StyledShadow>

        { /* REMINDER TIME */ }
        <p className="reminder-time">{formatReminderTime(reminder.date)}</p>
        { reminderClass !== 'expired' &&
          reminderClass !== 'current' &&
          reminder.date > moment().valueOf() ? (
          <div className="reminder-timer-wrapper">
            <span
              className="reminder-timer-icon"
              onClick={() => {setTimer(reminder)}}><TimerIcon/></span>
          </div>
        ) : null }
        </StyledShadow>
      </div>

      { /* REMOVE REMINDER ICON */ }
      <span
        className="remove-reminder"
        onClick={() => {removeReminder(reminder.id)}}>
        <RemoveIcon/>
      </span>
    </StyledReminder>
  )
}

// STYLED
const StyledReminder = styled.div`
  position: relative;
  padding: 15px 10px;
  display: flex;
  flex: 0 0 auto;
  width: 45%;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
    
  & > div {
    position: relative;
    box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.7);
    flex: 1;
    border: 1px solid ${colors.prim_color};
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 768px) {
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    & div:first-child {
      flex: 1;
    }
  }

  & .current {
    background: ${colors.overlay};
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

  & .reminder-title-wrapper {
    flex-grow: 1;
  }

  & .reminder-title {
    color: ${colors.prim_color};
    font-size: 13px;
    @media (max-width: 768px) {
      font-size: 10px;
      padding-top: 20px;
    }
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }

  & .reminder-info-wrapper {
    width: 20px;
    margin: 0 auto;
  }

  & .reminder-info-wrapper:hover .reminder-info {
    display: flex;
  }

  & .reminder-info-icon,
  & .reminder-timer-icon {
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  & .reminder-info-icon {
    color: ${colors.prim_light};
    font-size: 20px;
  }

  & .reminder-timer-icon {
    color: ${colors.ter_yellow};
    font-size: 30px;
  }

  & .reminder-timer-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .reminder-info {
    display: none;
    color: ${colors.prim_font};
    background-color: ${colors.ter_yellow};
    padding: 40px 20px;
    font-size: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  & .reminder-date-wrapper {
    flex: 0 100px;
    @media (max-width: 768px) {
      flex: 0 70px;
    }
  }

  & .reminder-date {
    color: ${colors.sec_light};
    font-size: 25px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding-top: 20%;
  }

  & .reminder-time {
    color: ${colors.prim_light};
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 18px;
      width: 50px;
    }
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

  .remove-reminder {
    position: absolute;
    color: ${colors.sec_color};
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    right: 15px;
    top: 15px;
  }
`
