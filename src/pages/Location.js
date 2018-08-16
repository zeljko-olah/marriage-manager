// IMPORTS
import React, {Component} from 'react'

import styled from 'styled-components'
import {StyledSection, StyledMainHeading, StyledMainContent} from '../styles/section'
import * as colors from '../styles/variables'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import * as events from '../events'

import Map from '../components/Maps/Map.js'
import Avatar from '../components/user/Avatar'

// COMPONENT
class Location extends Component {

  state = {
    lat: 44.8482181,
    lng: 20.3548942,
    from: 'Zeljko',
    id: '',
    createdAt: null
  }

  componentDidMount = () => {
    const { location, getLocations } = this.props
    getLocations()
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
    const { socket, setLocation, setFlashMessage } = this.props
    let started = false
    if (!started && socket !== null) {
      socket.on(events.LOCATION_SHARED, (coords, user) => {
        setLocation({
          lat: coords.latitude,
          lng: coords.longitude,
          userId: user.id
        }).then(result => {
          console.log("RESULT", result)
          this.setState(result)
          setFlashMessage({
            type: 'success',
            flashMessage: `${result.from} shared location!`
          })

        })

      })
      started = true
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.off(events.LOCATION_SHARED)
  }

  loadLocation = (location, index) => {
    this.setState(location)
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
    const { lat, lng, from } = this.state
    const { user, locations } = this.props
    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <h1>Location</h1>
          <StyledLocationHeading>
            <h3>{ `${from} is homed!` }</h3>
            
            <button onClick={this.sendLocation}>Share Your Location</button>
          </StyledLocationHeading>
        </StyledMainHeading>
  
        <StyledMainContent>
          <StyledContainer>
            <StyledLocations>
              <ul>
                { locations ? locations.map((location, index) => {
                  const timeParts = location.createdAt.split(',')
                  const time = timeParts[0]
                  const date = timeParts[1]
                  
                  return (
                    <li
                      key={location.id}
                      onClick={() => {this.loadLocation(location, index)}} >
                      <div className="avatar">
                        <Avatar
                          src={location.avatar}
                          name={location.user}/>
                      </div>
                      <div className="location-time">
                        <span><em>{ time }</em></span>
                        <span><strong>{ date }</strong></span>
                      </div>
                    </li>
                  )
                }) : null }  
              </ul>            
            
            </StyledLocations>
            <StyledMap>
              <Map
                lat={lat}
                lng={lng} />
            
            </StyledMap>        
          </StyledContainer>
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
    location: state.location,
    locations: state.location.locations
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocation: (location) => dispatch(actions.setLocation(location)),
  getLocations: () => dispatch(actions.getLocations()),
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash))

})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Location )

const StyledLocationHeading= styled.div`
  // border: 2px solid black;
  color: ${colors.prim_font};
  text-align: center;


  & button {
    // width: 100%;
    padding: 10px;
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    border: 2px solid ${colors.prim_color};
    background-color: ${colors.prim_light};
    color: grey;
    cursor: pointer;
  }
`
const StyledContainer= styled.div`
  display: flex;
  height: 50vh;
`
const StyledMap = styled.div`
  flex-basis: 70%;
  // border: 2px solid aquamarine;
`

const StyledLocations = styled.div`
  flex-basis: 30%;

  & ul {
    padding: 0;
    margin: 0;
    height: 52vh;
    overflow: auto;
    ::-webkit-scrollbar { 
      display: none;
    }
  }
  & li {
    display: flex;
    justify-content: space-around;
    padding: 5px;
    margin: 5px;
    border: 1px solid ${colors.prim_color};
    background-color: ${colors.prim_light};
    color: grey;
    cursor: pointer;
    transition: all 0.1s ease-in;
  }

  & li: first-child {
    margin-top: 0;
  }

  & li:hover {
    transform: scale(0.95);
    border: 1px solid ${colors.ter_yellow};
  }

  & .location-time span {
    display: block;
    font-size: 12px;
    padding-top: 4px;
  }

  & .avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
  }
`
