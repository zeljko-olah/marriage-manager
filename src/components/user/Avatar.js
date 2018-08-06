import React, {Component, Fragment} from 'react'

import styled from 'styled-components'

class Avatar extends Component {
  state = {
    noSource: false
  }

  render () {
    const { noSource } = this.state
    const { src, user } = this.props

    const firstLetter = user ? user.name.substr(0, 1) : ""

    return (
      <Fragment>
       <StyledAvatar>
        <img
          src={src}
          alt={"user avatar"}
          onError={({target}) => {
            target.src = 'uploads/users/default-avatar.png'
            this.setState({ noSource: true })
          }}/>
        { noSource ? <span className="initials">{ firstLetter }</span> : null  } 
       </StyledAvatar> 
      </Fragment>
   )

  }
}

export default Avatar

const StyledAvatar = styled.div`
  position: relative;
  z-index: 100;

  & img {
    overflow: hidden;
    border-radius: 50%;
    display: block;
    width: 50px;
    height: 50px;
  }

  & span.initials {
    font-size: 30px;
    text-transform: uppercase;
    position: absolute;
    top: -30%;
    right: -10%;
    // transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    color: tomato;
  }
 
`
