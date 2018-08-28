import React, { Component } from 'react'

import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledShadow, StyledDatePicker } from '../../styles/section'

import CalendarIcon from 'react-icons/lib/md/date-range'
import MoreIcon from 'react-icons/lib/md/more-vert'


class TodosMenu extends Component {

   // STATE
  state = {
    showAditionalMenu: false,
    calendarFocused: false,
    time: moment()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { time } = this.state
    const { dateUpdate, todosDate } = this.props
    if (prevState.time.valueOf() !== time.valueOf()) {
      dateUpdate(time.valueOf())
    }
    if (prevProps.todosDate !== todosDate) {
      this.onDateChange(moment(todosDate))
    }
  }

  // HANDLERS
  // Capture createdAt date
  onDateChange = (time) => {
  if (time) {
    this.setState(() => ({ time }))
  }
}

  // Capture focus change on datePicker
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  render() {
    return (
    <StyledShadow>
      <StyledTodosMenu>
        <div className="todo-calendar">
          <StyledShadow>
            { /* DATE PICKER COMPONENT */ }
            <StyledDatePicker>
              <SingleDatePicker
                date={this.state.time}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={day => false}
              />
            </StyledDatePicker>
            <CalendarIcon className="calendar-icon" />
          </StyledShadow>
        </div>
        <div className="status-menu">
          <StyledShadow>
            <p>Percentage {'70%'}</p>
          </StyledShadow>
        </div>
        <div className="more-icon">
          <MoreIcon />
        </div>
      </StyledTodosMenu>
    </StyledShadow>
    )
  }
}

export default TodosMenu

const StyledTodosMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.prim_light};

  & input {
    margin: 0 auto;
    padding: 8px;
    color: #fefeee;
    background-color: transparent;
    border: 2px solid Aquamarine;
    cursor: pointer;
  }

  & .todo-calendar svg {
    top: 5px;
    right: 10px;
  }

  & .todo-calendar .DayPickerNavigation_button {
    width: 40px;
    height: 30px;
    top: 20px;
  }

  & .todo-calendar {
    position: relative;
    width: 30%;
  }
  & .status-menu {
    text-align: center;
    text-transform: uppercase;

    & p {
      margin: 0;
    }
  }

  & .todo-calendar .calendar-icon {
    position: absolute;
    font-size: 30px;
    top: 22px;
    right: 14px;
  }

  & .more-icon {
    font-size: 30px;
    cursor: pointer;
  }
`
