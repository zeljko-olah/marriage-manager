import React, { Component } from 'react'

import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledShadow, StyledDatePicker } from '../../styles/section'

import CalendarIcon from 'react-icons/lib/md/date-range'
import ArrowDownIcon from 'react-icons/lib/md/arrow-drop-down'

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
    const { users, percentage, statusCount, filterByUser, filterByStatus } = this.props
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
                <p className="completed"><span>{statusCount.completed}</span> done</p>
                <p className="active"><span>{statusCount.active}</span> active</p>
                <p className="failed"><span>{statusCount.failed}</span> failed</p>
              </div>
            ) : (
              <div>Loading...</div>
            ) }
          </div>
            <div className="filter-by-user">
              <span
                className="label"
                onClick={this.handleShowUserFilter}
              >
                Filter by user <ArrowDownIcon /></span>
              {users.length && showUserFilter && (
                <div className="filter-dropdown">
                  <p 
                    className={filterByUser === users[0].name ? 'selected' : ''} 
                    onClick={() => {this.handleSortByUser(users[0].name)}}>{users[0].name}</p>
                  <p 
                    className={filterByUser === users[1].name ? 'selected' : ''} 
                    onClick={() => {this.handleSortByUser(users[1].name)}}>{users[1].name}</p>
                  <p 
                    className={filterByUser === 'both' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByUser('both')}}>Both</p>
                  <p 
                    className={filterByUser === '' ? 'selected' : '' } 
                    onClick={() => {this.handleSortByUser('')}}>All</p>
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
                  <p
                    className={filterByStatus === 'completed' ? 'selected' : ''}
                    onClick={() => {this.handleSortByStatus('completed')}}>Completed</p>
                  <p
                    className={filterByStatus === 'active' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByStatus('active')}}>Active</p>
                  <p
                    className={filterByStatus === 'failed' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByStatus('failed')}}>Failed</p>
                  <p
                    className={filterByStatus === '' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByStatus('')}}>All</p>
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
      font-style: italic;
      letter-spacing: 1px;

      & span {
        position: relative;
        font-size: 20px;
        top: 3px;
      }
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
      width: 90px;
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
        &:hover {
          background-color: ${colors.prim_light};
        }

      }
    }
  }
`
