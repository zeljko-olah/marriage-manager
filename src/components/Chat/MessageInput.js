// IMPORT
import React, { Component } from 'react'
import styled from 'styled-components'


// COMPONENT
class MessageInput extends Component {
  
  // State
  state = {
    message: '',
    isTyping : false
  }
  
  // Methods
  handleSubmit = (e) => {
    e.preventDefault()
    this.sendMessage()
    this.setState({ message: '' })
  }
  

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
  }
  
  
  // Render
  render() {
    const { message } = this.state
    return (
      <StyledWrap>

        { /* FORM */ }
        <form
          onSubmit={this.handleSubmit}>
          
          { /* INPUT */ }
          <StyledInput>
            <input
              id = "message"
              type = "text"
              placeholder = "Type ..."
              autoComplete = {'off'}
              value = {message}
              onKeyUp = { e => { e.keyCode !== 13 && this.setState({isTyping: true}) } }
              onChange={
                ({target}) => {
                  this.setState({ message: target.value })
                }
              } />
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
  top: 50px;
`

const StyledInput = styled.div`
  border: 2px solid Aquamarine;
  margin: 10px 30px 0;

  & input {
    width: 100%;
    padding: 10px;
    border: 3px solid tomato;
    background-color: #333;
    color: white;
    
    &::placeholder {
      font-size: 20px;
      font-style: italic;
      color: #ddd;
    }
  }
`
