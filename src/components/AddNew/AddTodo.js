// IMPORTS
import React, { Component } from 'react'

// Styled components
import { StyledForm, StyledButton, StyledShadow, StyledDatePicker } from '../../styles/section'

// React dates
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

// Moment
import moment from 'moment'

// Icons
import TriangleIcon from 'react-icons/lib/md/arrow-drop-down'

// COMPONENT
export default class AddTodo extends Component {
  
  // STATE
  state = {
    showDescriptionInput: false,
    createdAt: moment(),
    calendarFocused: false
  }
  
  // HANDLERS
  toggleDescription = () => {
    this.setState((prevState) => {
      return { showDescriptionInput: !prevState.showDescriptionInput }
    })    
  }

   // Capture createdAt date
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }

  // Capture focus change on datePicker
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  render() {
    const { activeTab, showDescriptionInput } = this.state

    return (
      <StyledForm>
        <StyledShadow>
          <label><p>Define</p></label>
          <p>
            <input type="text" />
          </p>
        </StyledShadow>
        <StyledShadow>
          <label><p>Who's gonna do it?</p></label>
          <StyledShadow>
            <div className="contain-checkboxes">
              <div className="checkboxes" >
                <label htmlFor="">Marina</label>
                <input className="checkbox" type="checkbox" />
                <span className="checkmark"></span>
              </div>
              <div className="checkboxes" >
                <label htmlFor="">Zeljko</label>
                <input className="checkbox" type="checkbox" />
                <span className="checkmark"></span>
              </div>
            </div>
          </StyledShadow>
        </StyledShadow>
        <StyledShadow>
          <label><p>Pick a day</p></label>
          { /* DATE PICKER COMPONENT */ }
          <StyledDatePicker>
            <SingleDatePicker
              date={this.state.createdAt}
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
            <textarea cols="10" rows="5"></textarea>
          </p>
          ) : null}
        </StyledShadow>
        <StyledShadow>
          <label><p>Priority...</p></label>
          <p>
            <select>
              <option selected value="low">Low</option>
              <option value="high">High</option>
              <option selected="selected" value="normal">Normal</option>
              <option value="special">Special</option>
            </select>
          </p>
        </StyledShadow>
        <StyledButton type="submit">
          Add
        </StyledButton>
      </StyledForm>
    )
  }
}
