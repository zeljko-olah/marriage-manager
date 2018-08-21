import React, {Component, Fragment} from 'react'

import styled from 'styled-components'

class Avatar extends Component {
  state = {
    noSource: false
  }

  render () {
    const { noSource } = this.state
    const { src, name } = this.props

    const firstLetter = name ? name.substr(0, 1) : ""

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
    width: 100%;
    height: 100%;
  }

  & span.initials {
    font-size: 30px;
    text-transform: uppercase;
    position: absolute;
    top: -30%;
    right: -10%;
    margin: 0;
    padding: 0;
    color: tomato;
  }
 
`
