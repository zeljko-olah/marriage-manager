import React, { Component } from 'react';
import styled from 'styled-components';

class Messages extends Component {
  render() {
    return (
      <StyledMessages>
        <StyledThread>
          <div className="messages">
            <div className="time">9.46</div>
            <div>
              <div className="message">A akako je lepo biti u drustvu moje zene</div>
              <div className="sender">Zeljko said...</div>
            </div>
          
          </div>
        </StyledThread>
      </StyledMessages>  
    )
  }
}

export default Messages

const StyledMessages = styled.div`
  height: 45vh;
`
const StyledThread = styled.div`
  margin: 0 30px;
  padding: 20px;

  & div.messages {
    border: 1px solid white;
    border-radius: 10px;
    padding: 5px 10px;
    background: #efe;
    width: 50%;
    color: white;
  }

  & div.time {
    color: tomato;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }

  & div.message {
    padding: 3px 0;
    color: #333;
    font-size: 16px;
    // font-weight: bold;
    text-align: left;
  }

  & div.sender {
    text-align: right;
    color: #777;
    font-style: italic;
  }
`
