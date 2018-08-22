import React, {Component} from 'react'


import styled from 'styled-components'
import {StyledSection, StyledMainHeading, StyledMainContent, StyledForm, StyledButton} from '../styles/section'
import * as colors from '../styles/variables'

import TriangleIcon from 'react-icons/lib/md/arrow-drop-down'


class AddNew extends Component {
  state = {
    activeTab: 'todo',
    showDescriptionInput: false
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
  
  

  render () {

    const { activeTab, showDescriptionInput } = this.state
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
                { activeTab === 'todo' ? (
                <StyledForm>
                  <div>
                    <label><p>Define goal</p></label>
                    <p>
                      <input type="text" />
                    </p>
                  </div>
                  <div>
                    <label
                      className="drop-down" 
                      onClick={this.toggleDescription}><p>Describe more...</p><span><TriangleIcon /></span></label>
                   {showDescriptionInput ? (
                    <p>
                    <textarea cols="10" rows="5"></textarea>
                  </p>
                   ) : null}
                  </div>
                  <div>
                    <label><p>Priority...</p></label>
                    <p>
                      <select>
                        <option selected value="low">Low</option>
                        <option value="high">High</option>
                        <option selected="selected" value="normal">Normal</option>
                        <option value="special">Special</option>
                      </select>
                    </p>
                  </div>
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