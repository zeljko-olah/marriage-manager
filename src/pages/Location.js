// IMPORTS
import React, {Component} from 'react'

import {StyledSection, StyledMainHeading, StyledMainContent} from '../styles/section'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import * as events from '../events'

import Map from '../components/Maps/Map.js'

// COMPONENT
class Location extends Component {

  state = {
    lat: 44.8482181,
    lng: 19.3548942
  }

  componentDidMount = () => {
    const { location } = this.props
    console.log('MOUNTED')
    try {
      this.setState({
        lat: location.lat,
        lng: location.lng
      })
    } catch (error) {
      alert(error)
    }
  }
  

  componentDidUpdate = (prevProps) => {
    const { socket, setLocation } = this.props
    let started = false
    if (!started && socket !== null) {
      socket.on(events.LOCATION_SHARED, (coords, user) => {
        const location = {
          lat: coords.latitude,
          lng: coords.longitude
        }
        this.setState(location)   
        setLocation(location)

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
      }, user )
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
    socket: state.chat.socket,
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocation: (location) => dispatch(actions.setLocation(location))
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Location );
