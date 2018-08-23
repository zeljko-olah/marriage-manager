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
class AddReminder extends Component {
  
  // STATE
  state = {
    showDescriptionInput: false,
    createdAt: moment(),
    calendarFocused: false,
    time: moment()
  }

   // REFS
   inputs = {}
  
  // HANDLERS

  submit = (e) => {
    const { time } = this.state
    const { submit } = this.props
    e.preventDefault()
    submit(this.inputs, time)
    this.setState({ time: moment() })
  }

  toggleDescription = () => {
    this.setState((prevState) => {
      return { showDescriptionInput: !prevState.showDescriptionInput }
    })    
  }

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
    const { showDescriptionInput } = this.state
    const { title, who, error, clearError } = this.props
    
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
            <div className="contain-checkboxes">
              <div className="checkboxes" >
                <label htmlFor="">Marina</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value="marina"
                    ref={input => {this.inputs['marina'] = input}}  />
                <span className="checkmark"></span>
              </div>
              <div className="checkboxes" >
                <label htmlFor="">Zeljko</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value='zeljko'
                    ref={input => {this.inputs['zeljko'] = input}} />
                <span className="checkmark"></span>
              </div>
            </div>
          </StyledShadow>
        </StyledShadow>
          <StyledShadow>
            <label><p>Pick a date</p></label>
            { /* DATE PICKER COMPONENT */ }
            <StyledDatePicker>
              <SingleDatePicker
                date={this.state.time}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={day => moment().subtract(1, 'days').isSameOrAfter(day, 'day')}
              />
            </StyledDatePicker>
          </StyledShadow>
          <StyledShadow>
            <label
              className="drop-down" 
              onClick={this.toggleDescription}><p>Describe more...</p><span><TriangleIcon /></span></label>
            {showDescriptionInput ? (
              <p>
                <textarea
                  cols="10"
                  rows="5"
                  ref={input => {this.inputs.description = input}} ></textarea>
              </p>
            ) : null}
          </StyledShadow>
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
          <StyledButton type="submit">
            Add
          </StyledButton>
        </form>
      </StyledForm>
    )
  }
}

export default AddReminder

