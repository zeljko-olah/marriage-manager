import React from 'react'

import Reminder from '../../components/Reminders/Reminder'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'

const ListReminders = ({reminderClass, reminders, users, removeReminder, show, setTimer}) => {
  return (
    <StyledReminders className={show === true ? 'show' : 'hide'}> 
          
      { reminders.map(reminder => {
        return (
          <Reminder
            key={reminder.id}
            reminder={reminder}
            reminderClass={reminderClass}
            users={users}
            removeReminder={removeReminder}
            setTimer={setTimer} />
        )
      }) }
    </StyledReminders> 
  )
}
    
export default ListReminders

const StyledReminders = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: auto;
  ::-webkit-scrollbar { 
    display: none;
  }
  transition: all .3s ease-in;

  &.hide {
    opacity: 0;
    height: 0;
    transform: translateX(-10%);
  }
  
  &.show {
    opacity: 1;
    height: 200px;
    transform: translateX(0);
  }
`
