// IMPORTS
import React, { Component } from 'react'

// REDUX
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

// Styled components
import { StyledForm, StyledButton, StyledShadow, StyledDatePicker } from '../../styles/section'

// React dates
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

// Moment
import moment from 'moment'

//
import { clearForm } from '../../shared/utility'

// Icons
import TriangleIcon from 'react-icons/lib/md/arrow-drop-down'

// COMPONENT
class AddTodo extends Component {
  
  // STATE
  state = {
    showDescriptionInput: false,
    time: moment(),
    calendarFocused: false,
    error: ''
  }
  
  // REFS
  inputs = {}
  
  // HANDLERS
  toggleDescription = () => {
    this.setState((prevState) => {
      return { showDescriptionInput: !prevState.showDescriptionInput }
    })    
  }

   // Capture time date
  onDateChange = (time) => {
    if (time) {
      this.setState(() => ({ time }))
    }
  }

  // Capture focus change on datePicker
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  // Handle Add Todo
  handleAddTodo = (e) => {
    e.preventDefault()

    // Define variables
    const { time } = this.state
    const { user, addTodo, setFlashMessage } = this.props
    const {title, description, priority } = this.inputs
    let desc
    let who
    
    // Validate
    if (title && title.value.trim() === '') {
      setFlashMessage({
        type: 'error',
        flashMessage: `Hey ${user.name}, define a todo first!`
      })
      this.setState({error: 'title'})
      return
    }

    if (!this.inputs['marina'].checked && !this.inputs['zeljko'].checked ) {
      setFlashMessage({
        type: 'error',
        flashMessage: `Hey ${user.name}, somebody has to do it!`
      })
      this.setState({error: 'checkboxes'})
      return
    } else if (!this.inputs['marina'].checked) {
      who = 'zeljko'
    } else if (!this.inputs['zeljko'].checked) {
      who = 'marina'
    } else {
      who = 'both'
    }

    if (description === undefined) {
      desc = 'No description'
    } else {
      desc = description.value
    }
    
    // Prepare payload
    const payload = {
      userId: user.id,
      title: title.value,
      description: desc,
      who,
      priority: priority.value,
      date: time.valueOf()
    }
    
    // Persist to database and to store
    addTodo(payload)
      .then(() => {
        setFlashMessage({
          type: 'success',
          flashMessage: `Todo successfully added :)`
        })
        // Clear form
        clearForm(this.inputs)
        this.setState({ time: moment() })
      })
  }
  
  // RENDER
  render() {
    const { showDescriptionInput, error } = this.state

    return (
      <StyledForm
        onClick={() => {this.setState({ error: '' })}}
        onBlur={() => {this.setState({ error: '' })}} >
        <form onSubmit={this.handleAddTodo}>
        
          { /* DEFINE */ }
          <StyledShadow>
            <label><p>Define</p></label>
            <p>
              <input
                className={error === 'title' ? 'error-title': null}
                type="text"
                ref={input => {this.inputs.title = input}} />
            </p>
          </StyledShadow>

          { /* CHECKBOXES */ }
          <StyledShadow>
            <label>
              <p>Who's gonna do it?</p>
            </label>
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

          { /* DATE PICKER */ }
          <StyledShadow>
            <label><p>Pick a day</p></label>
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

          { /* DESCRIPTION */ }
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

          { /* PRIORITY */ }
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

          { /* SUBMIT BUTTON */ }
          <StyledButton type="submit">
            Add
          </StyledButton>
        </form>
      </StyledForm>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    socket: state.chat.socket,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(actions.addTodo(todo)),
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash))
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( AddTodo )
