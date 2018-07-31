import React, { Component } from 'react'
import styled from 'styled-components'


class MessageInput extends Component {

  state = {
    message: '',
    isTyping : false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.sendMessage()
    this.setState({ message: '' })
  }
  

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
  }
  

  render() {
    const { message } = this.state
    return (
      <StyledWrap>
        <form
          onSubmit={this.handleSubmit}>
          <StyledForm>
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
          
          </StyledForm>
        
        </form>
      </StyledWrap>
    )
  }
}


export default MessageInput

const StyledWrap = styled.div`
  position: relative;
  top: 50px;
`

const StyledForm = styled.div`
  border: 2px solid Aquamarine;
  margin: 10px 30px 0;

  & input {
    width: 100%;
    padding: 10px;
    border: 3px solid tomato;
    background-color: #333;
    color: white;
    
    &::placeholder {
      color: #ddd;
      font-size: 20px;
      font-style: italic;
    }

  }
`
