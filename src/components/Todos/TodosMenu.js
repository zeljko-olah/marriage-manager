import React, { Component } from 'react'

import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledShadow, StyledDatePicker } from '../../styles/section'

import CalendarIcon from 'react-icons/lib/md/date-range'


class TodosMenu extends Component {

   // STATE
  state = {
    showAditionalMenu: false,
    calendarFocused: false,
    time: moment()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { time } = this.state
    const { dateUpdate } = this.props
    if (prevState.time.valueOf() !== time.valueOf()) {
      dateUpdate(time.valueOf())
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
          <CalendarIcon />
        </div>
        <div className="status-menu">
          <span>Active</span>
          <span>Completed</span>
          <span>Failed</span>
        </div>
      </StyledTodosMenu>
    </StyledShadow>
    )
  }
}

export default TodosMenu

const StyledTodosMenu = styled.div`
  display: flex;

  & input {
    // width: 1%;
    margin: 0 auto;
    padding: 8px;
    color: #fefeee;
    background-color: transparent;
    border: 2px solid Aquamarine;
    cursor: pointer;
  }

  & .todo-calendar {
    position: relative;
    width: 30%;
  }
  & .status-menu {
    flex-grow: 1;
  }

  & .todo-calendar svg {
    color: ${colors.prim_light}
    position: absolute;
    font-size: 30px;
    top: 7px;
    right: 5px;
  }
`
