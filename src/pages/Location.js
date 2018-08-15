// IMPORTS
import React, {Component} from 'react'

import {StyledSection, StyledMainHeading, StyledMainContent} from '../styles/section'

import { connect } from 'react-redux'

import * as events from '../events'

import Map from '../components/Maps/Map.js'

// COMPONENT
class Location extends Component {

  state = {
    lat: 45.8482181,
    lng: 20.3548942
  }

  componentDidUpdate = (prevProps) => {
    console.log(prevProps)
    console.log(this.props)
    const { socket } = this.props
    let started = false
    if (!started && socket !== null) {
      socket.on(events.LOCATION_SHARED, (coords, userId) => {
        console.log(coords, userId)
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude
        })
      })
      started = true
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.off(events.LOCATION_SHARED)
  }
  

  sendLocation = () => {
    const { socket, user } = this.props
    console.log('send!!!', socket)

    if (!navigator.geolocation){
      // If not then alert notification
      return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position){
      socket.emit(events.SHARE_LOCATION, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, user.id )
    }, function () {
      alert('Unable to fetch location.')
    })
  }
  
  render () {
    const { lat, lng } = this.state
    const { user } = this.props
    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <h1>Location</h1>
          <p>Coordinates: {lat}, {lng}</p>
          <button onClick={this.sendLocation}>Send Location</button>
        </StyledMainHeading>
  
        <StyledMainContent>
        <Map
          lat={lat}
          lng={lng} />        
        
        </StyledMainContent>
      </StyledSection>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    socket: state.chat.socket
  }
}

// EXPORT
export default connect( mapStateToProps )( Location );
