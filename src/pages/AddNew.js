import React, {Component} from 'react'

// DATE PICKER 3RD PARTY COMPONENENT CSS
import 'react-dates/lib/css/_datepicker.css'
import styled from 'styled-components'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledForm, StyledButton,
  StyledShadow, StyledDatePicker
} from '../styles/section'
import * as colors from '../styles/variables'

import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

import TriangleIcon from 'react-icons/lib/md/arrow-drop-down'


class AddNew extends Component {
  state = {
    activeTab: 'todo',
    showDescriptionInput: false,
    createdAt: moment(),
    calendarFocused: false
  }

  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab,
    })    
  }

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
  
  render () {
    const { activeTab, showDescriptionInput } = this.state
    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Add New</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
            <StyledShadow>
              <StyledTabsWrapper>
                <StyledTabHeader>
                  <div
                    className={activeTab === 'todo' ? 'active': ''}
                    onClick={() => {this.setActiveTab('todo')}} >
                    <h2>Todo</h2>
                  </div>
                  <div className={activeTab === 'reminder' ? 'active': ''}
                  onClick={() => {this.setActiveTab('reminder')}} >
                    <h2>Reminder</h2>
                  </div>
                </StyledTabHeader>
                <StyledTabs>
                  { activeTab === 'todo' ? (
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
                          isOutsideRange={() => false}
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
                  ) : (
                    <div>
                    <label>Add reminder</label>
                    <input type="text"/>
                  </div>
                  ) }
                </StyledTabs>
              </StyledTabsWrapper>
            </StyledShadow>            
          </StyledMainContent>
        </StyledSection>
    )
  }
} 

export default AddNew

const StyledTabsWrapper = styled.div`
  padding: 10px 50px;
`
const StyledTabHeader = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  padding-bottom: 0;
  & div {
    flex-basis: 50%;
    padding: 10px;
    cursor: pointer;
  }

  & .active {
    position: relative;
    z-index: 100;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    top: 1px;
    background-color: ${colors.prim_color};
  }

  & h2 {
    color: ${colors.prim_font};
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 100;
    margin: 5px 0;
  }
` 

const StyledTabs = styled.div`
  margin: 10px;
  margin-top: 0;
  border: 1px solid grey;
  padding: 10px;
  background-color: ${colors.backdrop};

  & label.drop-down {
    position: relative;
    cursor: pointer

    & span {
      position: absolute;
      top: 3px;
      right: 3px;
      color: ${colors.ter_yellow};
      transform: scaleY(1.8);
    }
  }
`