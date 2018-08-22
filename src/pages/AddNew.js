import React, {Component} from 'react'

import AddTodo from '../components/AddNew/AddTodo'
import AddReminder from '../components/AddNew/AddReminder'

// Styled components
import styled from 'styled-components'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledForm, StyledButton,
  StyledShadow, StyledDatePicker
} from '../styles/section'
import * as colors from '../styles/variables'


class AddNew extends Component {

  // STATE
  state = {
    activeTab: 'todo'
  }

  // HANDLERS
  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab,
    })    
  }
  
  // RENDER METHOD
  render () {
    const { activeTab } = this.state
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
                  { activeTab === 'todo' ? <AddTodo /> : <AddReminder /> }
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
  @media (max-width: 768px) {
    padding: 0;
  }
`
const StyledTabHeader = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  @media (max-width: 768px) {
    padding: 5px 0;
  }
  padding-bottom: 0;
  & div {
    flex-basis: 50%;
    padding: 10px;
    cursor: pointer;
    position: relative;
    top: 1px;
    @media (max-width: 768px) {
      top: 5px;
    }
  }

  & .active {
    z-index: 100;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    background-color: ${colors.prim_color};
  }

  & h2 {
    color: ${colors.ter_yellow};
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 100;
    margin: 5px 0;
    @media (max-width: 768px) {
      font-size: 20px;
      letter-spacing: 3px;
    }
  }

  & .active h2 {
    color: ${colors.prim_font};
  }
` 

const StyledTabs = styled.div`
  margin: 10px;
  margin-top: 0;
  border: 1px solid grey;
  padding: 10px;
  background-color: ${colors.backdrop};
  @media (max-width: 768px) {
    padding: 5px 0;
    margin: 0;
  }
`