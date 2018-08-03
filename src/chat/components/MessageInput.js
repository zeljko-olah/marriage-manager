// IMPORT
import React, { Component } from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

// COMPONENT
class MessageInput extends Component {
  
  // State
  state = {
    message: '',
    isTyping : false
  }
  
  // Methods
  handleSubmit = (e) => {
    if (e) {e.preventDefault()}
    this.sendMessage()
    this.setState({ message: '' })
  }

  onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      this.setState({ message: '' })
      this.handleSubmit()
    }
  }  

  sendMessage = () => {
    const { message } = this.state
    if (!message.trim()) {
      return
    }
    this.props.sendMessage(message)
  }
  
  
  // Render
  render() {
    const { message } = this.state
    const { width } = this.props
    return (
      <StyledWrap>

        { /* FORM */ }
        <form
          onSubmit={this.handleSubmit}>
          
          { /* INPUT */ }
          <StyledInput width={width}>
            <textarea
              id = "message"
              type = "text"
              placeholder = "Type ..."
              autoComplete = {'off'}
              value = {message}
              onKeyDown = {(e) => {
                this.onEnterPress(e)
              }}
              onChange={
                (e) => {
                  this.setState({ message: e.target.value })
                }
              } />
            { width && width < 768 ? (<button type="submit">Send</button>) : null }
          </StyledInput>
        </form>
      </StyledWrap>
    )
  }
}

// EXPORT
export default MessageInput

// STYLED
const StyledWrap = styled.div`
  position: relative;
  // top: 25px;
`

const StyledInput = styled.div`
  // border: 2px solid ${colors.prim_color};
  height: 50px;
  display: flex;

  & textarea,
  & button {
    border: none;
    &:focus {
      border: none;
      border-top: 2px solid ${colors.prim_color};
      outline: none;
    }
  }

  & textarea {
    width: ${props => props.width > 768 ? '100%' : '70%'};
    padding: 15px 10px 10px;
    font-family: 'PT mono';
    font-size: 14px;
    overflow: auto;
    background-color: white;
    resize: none;
    border-top: 2px solid transparent;
    white-space: pre-line;
    white-space: pre-wrap;
    
    &::placeholder {
      font-family: 'PT mono';
      font-size: 14px;
    }
  }

  & button {
    width: 30%;
    cursor: pointer;
    border: 2px solid ${colors.prim_color};
    background-color: ${colors.prim_color};
    color: white;
    font-size: 20px;
    font-style: italic;
    font-weight: 100;
    text-transform: uppercase;
    letter-spacing: 4px;

    &:hover {
      background-color: ${colors.sec_color};
    }
  }
`
