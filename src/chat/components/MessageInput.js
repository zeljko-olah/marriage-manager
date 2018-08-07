// IMPORT
import React, { Component } from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

import SendIcon from 'react-icons/lib/md/send'

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
            { width && width < 768 ? (<button type="submit"><i><SendIcon /></i></button>) : null }
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
`

const StyledInput = styled.div`
  height: 50px;
  display: flex;

  & textarea,
  & button {
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }

  & textarea {
    width: ${props => props.width > 768 ? '100%' : '70%'};
    width: 100%;
    padding: 15px 10px 10px;
    font-family: 'PT mono';
    font-size: 14px;
    overflow: auto;
    background-color: white;
    resize: none;
    border-top: 2px solid transparent;
    white-space: pre-line;
    white-space: pre-wrap;
    color: ${colors.prim_font};

    
    &::placeholder {
      font-family: 'PT mono';
      font-size: 14px;
      color: ${colors.prim_font};
    }
  }

  & button {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${colors.backdrop};
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.3);
    color: #555;
    font-size: 20px;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
      background-color: #ddd;
      box-shadow: 0 8px 15px 0 rgba(0,0,0,0.3);
    }

    & i svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
