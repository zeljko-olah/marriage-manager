import React, {Component} from 'react'


import styled from 'styled-components'
import {StyledSection, StyledMainHeading, StyledMainContent, StyledButton} from '../styles/section'
import * as colors from '../styles/variables'

class AddNew extends Component {
  state = {
    activeTab: 'todo'
  }

  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab
    })    
  }
  

  render () {

    const { activeTab } = this.state
    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Add New</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
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
                <div>
                  { activeTab === 'todo' ? (
                    <div>
                    <label>Add todo</label>
                    <input type="text"/>
                    <StyledButton type="submit">
                      Add
                    </StyledButton>
                  </div>
                  ) : (
                    <div>
                    <label>Add reminder</label>
                    <input type="text"/>
                  </div>
                  ) }
                </div>
              </StyledTabs>
            </StyledTabsWrapper>
            
          </StyledMainContent>
        </StyledSection>
    )
  }
} 

export default AddNew

const StyledTabsWrapper = styled.div`
  padding: 50px;
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
  }
` 

const StyledTabs = styled.div`
  margin: 10px;
  margin-top: 0;
  border: 1px solid grey;
  padding: 10px;
  background-color: ${colors.backdrop};

  & div {
    display: flex;
    flex-direction: column;
  }
`