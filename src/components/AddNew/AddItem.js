// IMPORTS
import React, { Component } from 'react'

// Styled components
import {
  StyledForm, StyledButton, StyledShadow, StyledDatePicker
} from '../../styles/section'

// React dates
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

// Moment
import moment from 'moment'

// Icons
import TriangleIcon from 'react-icons/lib/md/arrow-drop-down'

// COMPONENT
class AddItem extends Component {
  
  // STATE
  state = {
    showDescriptionInput: false,
    createdAt: moment(),
    calendarFocused: false,
    date: moment(),
    time: moment().format('HH:mm')
  }

   // REFS
   inputs = {}
  
  // HANDLERS

  submit = (e) => {
    const { date, time } = this.state
    const { submit } = this.props
    e.preventDefault()
    submit(this.inputs, date, time)
    this.setState({ date: moment() })
  }

  toggleDescription = () => {
    this.setState((prevState) => {
      return { showDescriptionInput: !prevState.showDescriptionInput }
    })    
  }

   // Capture createdAt date
  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }))
    }
  }

   // Capture createdAt date
  onTimeChange = ({target}) => {
    const time = target.value
    const pattern = /^([0-1]?\d|2[0-3])(:([0-5]?\d)|:?)$/
    if (!time || pattern.test(time)) {
      this.setState(() => ({ time }))
    }
  }

  // Capture focus change on datePicker
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  render() {
    const { showDescriptionInput, time } = this.state
    const { reminder, title, who, error, clearError, roomUsers, timeInput } = this.props
    
    return (
      <StyledForm
        onClick={clearError}
        onBlur={clearError} >
        <form
          onSubmit={this.submit}>
          <StyledShadow>
            <label><p>{title}</p></label>
            <p>
              <input
                className={error === 'title' ? 'error-title': null}
                type="text"
                ref={input => {this.inputs.title = input}} />
            </p>
          </StyledShadow>
          <StyledShadow>
            <label><p>{who}</p></label>
            <StyledShadow className={error === 'checkboxes' ? 'error-checkbox': ''}>
              <StyledShadow>
                <div className="contain-checkboxes">
                  <div className="checkboxes" >
                    <label htmlFor="">{roomUsers[0]}</label>
                      <input
                        className="checkbox"
                        type="checkbox"
                        value="marina"
                        ref={input => {this.inputs[roomUsers[0]] = input}}  />
                    <span className="checkmark"></span>
                  </div>
                  <div className="checkboxes" >
                    <label htmlFor="">{roomUsers[1]}</label>
                      <input
                        className="checkbox"
                        type="checkbox"
                        value='zeljko'
                        ref={input => {this.inputs[roomUsers[1]] = input}} />
                    <span className="checkmark"></span>
                  </div>
                </div>
              </StyledShadow>
            </StyledShadow>
          </StyledShadow>

          { /* DATE PICKER COMPONENT */ }
          <StyledShadow>
            <div className="date-wrapper">
              <div className="date-picker">
                <label><p>Pick a date</p></label>
                <StyledDatePicker>
                  <SingleDatePicker
                    date={this.state.date}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={day => moment().subtract(1, 'days').isSameOrAfter(day, 'day')}
                  />
                </StyledDatePicker>
              </div>            
              { /* TIME INPUT */ }
              { timeInput && (
                <div className="time-picker">
                  <label><p>Set a time</p></label>
                  <input
                    className={error === 'time' ? 'time-input error-time': 'time-input'}
                    type="text"
                    value={time}
                    onChange={this.onTimeChange}/>
                </div>
              ) }
              </div>            
          </StyledShadow>
          <StyledShadow>
            <label
              className="drop-down" 
              onClick={this.toggleDescription}><p>Describe more...<span><TriangleIcon /></span></p></label>
            {showDescriptionInput ? (
              <p>
                <textarea
                  cols="10"
                  rows="5"
                  ref={input => {this.inputs.description = input}} ></textarea>
              </p>
            ) : null}
          </StyledShadow>

          { /* PRIORITY */ }
          { !reminder && (
            <StyledShadow>
              <label><p>Priority...</p></label>
              <p>
                <select
                  defaultValue="normal"
                  ref={input => {this.inputs.priority = input}} >
                  <option value="low">Low</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="special">Special</option>
                </select>
              </p>
            </StyledShadow>
          ) }
          
          <StyledButton type="submit">
            Add
          </StyledButton>
        </form>
      </StyledForm>
    )
  }
}

export default AddItem

