import React, { Component } from 'react'

import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledShadow, StyledDatePicker, StyledButton } from '../../styles/section'

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
    showStatusFilter: false,
    showPriorityFilter: false
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

  handleShowPriorityFilter = () => {
    this.setState((prevState) => {
      return {
        showPriorityFilter: !prevState.showPriorityFilter
      }
    })
  }

  handleCloseFilters = () => {
    this.setState({
      showUserFilter: false,
      showStatusFilter: false,
      showPriorityFilter: false
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

  handleSortByPriority = (priority) => {
    const { sortByPriority } = this.props
    sortByPriority(priority)
    this.handleCloseFilters()
  }  
  handleResetFilters = () => {
    this.handleSortByUser('')
    this.handleSortByStatus('')
    this.handleSortByPriority('')
  }
  

  render() {
    const {
      users, percentage, statusCount, filterByUser, filterByStatus, filterByPriority
    } = this.props
    const { showUserFilter, showStatusFilter, showPriorityFilter } = this.state
    return (
    <StyledShadow>
      <WithOutsideClick executeMethod={this.handleCloseFilters}>
        <StyledTodosMenu>

          { /* TODO WIDGETS */ }
          <div className="todo-widgets">
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

            { /* PERCENTAGE WIDGET */ }
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

            { /* STATUS COUNT */ }
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
          </div>

          { /* FILTERS */ }
          <div className="todo-filters">
            <div className="filter-by-user">
              <span
                className="label"
                onClick={this.handleShowUserFilter}
              >
                {filterByUser === '' ? (<em>Filter by user <ArrowDownIcon /></em>) : (
                  <em className="filter-criteria">{filterByUser}</em>
                ) }</span>
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
              {filterByStatus === '' ? (<em>Filter by status <ArrowDownIcon /></em>) : (
                <em className="filter-criteria">{filterByStatus}</em>
              ) }</span>
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
            <div className="filter-by-priority">
              <span
                className="label"
                onClick={this.handleShowPriorityFilter}
              >
              {filterByPriority === '' ? (<em>Filter by priority <ArrowDownIcon /></em>) : (
                <em className="filter-criteria">{filterByPriority}</em>
              ) }</span>
              {showPriorityFilter && (
                <div className="filter-dropdown">
                  <p
                    className={filterByPriority === 'low' ? 'selected' : ''}
                    onClick={() => {this.handleSortByPriority('low')}}>Low</p>
                  <p
                    className={filterByPriority === 'normal' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByPriority('normal')}}>Normal</p>
                  <p
                    className={filterByPriority === 'high' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByPriority('high')}}>High</p>
                  <p
                    className={filterByPriority === 'special' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByPriority('special')}}>Special</p>
                  <p
                    className={filterByPriority === '' ? 'selected' : ''} 
                    onClick={() => {this.handleSortByPriority('')}}>All</p>
                </div>  
              )}
            </div>
            <StyledButton
              small
              onClick={this.handleResetFilters}
              disabled={filterByUser === '' && filterByStatus === '' && filterByPriority === ''}>
              Reset filters
            </StyledButton>
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
  flex-direction: column;
  color: ${colors.prim_light};
  font-style: italic;
  font-weight: bold;
  font-size: 12px;

  & .todo-widgets,
  & .todo-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .todo-filters {
    margin-top: 10px;
    justify-content: space-between; 
  }

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
  & .filter-by-status,
  & .filter-by-priority {
    position: relative;
    width: 100px;
    margin-left: 10px;
    & span.label {
      cursor: pointer;
      & em.filter-criteria {
        text-transform: uppercase;
        color: ${colors.prim_color};
      }
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
