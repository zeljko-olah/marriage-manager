import React, { Component } from 'react'

import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledShadow, StyledDatePicker } from '../../styles/section'

import CalendarIcon from 'react-icons/lib/md/date-range'
import ArrowDownIcon from 'react-icons/lib/md/arrow-drop-down'

import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import StyledProgressbar from './StyledProgressbar';
import WithOutsideClick from '../../hoc/WithOutsideClick'

class TodosMenu extends Component {

   // STATE
  state = {
    showAditionalMenu: false,
    calendarFocused: false,
    time: moment(),
    showUserFilter: false,
    showStatusFilter: false
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { time } = this.state
    const { dateUpdate, todosDate, percentage, congratulations } = this.props
    if (prevState.time.valueOf() !== time.valueOf()) {
      dateUpdate(time.valueOf())
    }
    if (prevProps.todosDate !== todosDate) {
      this.onDateChange(moment(todosDate))
    }
    if (prevProps.percentage !== percentage && percentage === 100) {
      congratulations()
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

  handleShowUserFilter = () => {
    this.setState((prevState) => {
      return {
        showUserFilter: !prevState.showUserFilter
      }
    })
  }
  handleShowStatusFilter = () => {
    this.setState((prevState) => {
      return {
        showStatusFilter: !prevState.showStatusFilter
      }
    })
  }

  handleCloseFilters = () => {
    this.setState({
      showUserFilter: false,
      showStatusFilter: false
    })
  }

  handleSortByUser = (userName) => {
    const { sortByUser } = this.props
    sortByUser(userName)
    this.handleCloseFilters()
  }  

  handleSortByStatus = (status) => {
    const { sortByStatus } = this.props
    sortByStatus(status)
    this.handleCloseFilters()
  }  

  render() {
    const { users, percentage, statusCount } = this.props
    const { showUserFilter, showStatusFilter } = this.state
    return (
    <StyledShadow>
      <WithOutsideClick executeMethod={this.handleCloseFilters}>
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
            <div style={{width: '50px'}}>
              {percentage ? (
                <StyledProgressbar percentage={percentage} text={`${percentage}%`} />
              ) : (
                <StyledProgressbar percentage={0} text={`${0}%`} />
              )}           
            </div>
          </StyledShadow>
          </div>
          <div className="status-count">
            { statusCount && Object.keys(statusCount).length > 0 ? (
              <div>
                <p>{statusCount.completed} done</p>
                <p>{statusCount.active} active</p>
                <p>{statusCount.failed} failed</p>
              </div>
            ) : (
              <div>Hello</div>
            ) }
          </div>
            <div className="filter-by-user">
              <span
                className="label"
                onClick={this.handleShowUserFilter}
              >
                Filter by user <ArrowDownIcon /></span>
              {showUserFilter && (
                <div className="filter-dropdown">
                  <p onClick={() => {this.handleSortByUser(users[0].name)}}>{users[0].name}</p>
                  <p onClick={() => {this.handleSortByUser(users[1].name)}}>{users[1].name}</p>
                  <p onClick={() => {this.handleSortByUser('both')}}>Both</p>
                  <p onClick={() => {this.handleSortByUser('')}}>All</p>
                </div> 
              )}         
            </div>
            <div className="filter-by-status">
              <span
                className="label"
                onClick={this.handleShowStatusFilter}
              >
                Filter by status <ArrowDownIcon /></span>
              {showStatusFilter && (
                <div className="filter-dropdown">
                  <p onClick={() => {this.handleSortByStatus('completed')}}>Completed</p>
                  <p onClick={() => {this.handleSortByStatus('active')}}>Active</p>
                  <p onClick={() => {this.handleSortByStatus('failed')}}>Failed</p>
                  <p onClick={() => {this.handleSortByStatus('')}}>All</p>
                </div>  
              )}
            </div>
      </StyledTodosMenu>
      </WithOutsideClick>
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
  font-style: italic;
  font-weight: bold;
  font-size: 12px;

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

  & .status-count {
    flex-basis: 100px;
    & p {
      margin: 0;
    }
  }
  
  & .filter-by-user,
  & .filter-by-status {
    position: relative;
    height: 70px;
    & span.label {
      cursor: pointer;
    }
    & div {
      position: absolute;
      z-index: 2000;
      top: 15px;
      right: 5px;
      width: 100px;
      border-radius: 3px;
      box-shadow: 1px 1px 10px ${colors.overlay};
      background-color: ${colors.ter_yellow};
      color: ${colors.prim_font};

      & p {
        margin: 0;
        padding: 5px;
        cursor: pointer;
        &.selected {
          background-color: ${colors.prim_light};
        }
      }
    }
  }
`
