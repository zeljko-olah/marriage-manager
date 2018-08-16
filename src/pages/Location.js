// IMPORTS
import React, {Component} from 'react'

import styled from 'styled-components'
import {StyledSection, StyledMainHeading, StyledMainContent} from '../styles/section'
import * as colors from '../styles/variables'

import { connect } from 'react-redux'
import * as actions from '../store/actions'
import {selectSortedLocations} from '../store/selectors/location'

import * as events from '../events'

import Map from '../components/Maps/Map.js'
import Avatar from '../components/user/Avatar'

// COMPONENT
class Location extends Component {

  state = {
    lat: 44.8482181,
    lng: 20.3548942,
    from: '',
    id: '',
    createdAt: null,
    recentLocationsOpen: false
  }

  componentDidMount = () => {
    const { location, getLocations } = this.props
    getLocations()
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

  toggleLocations = () => {
    this.setState((prevState) => {
      return {recentLocationsOpen: !prevState.recentLocationsOpen}
    })
  }

  loadLocation = (location, index) => {
    this.setState(location)
    this.toggleLocations()
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
    const { lat, lng, recentLocationsOpen } = this.state
    const { user, locations } = this.props
    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <StyledLocationHeading>
            <button onClick={this.sendLocation}>Share Your Location</button>
            <button
              className={recentLocationsOpen ? 'active': ''}
              onClick={this.toggleLocations}>Recent Places</button>
          </StyledLocationHeading>
        </StyledMainHeading>
  
        <StyledMainContent>
          <StyledContainer>
            { recentLocationsOpen ? (
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
                      <div>
                        <h4>{index + 1}. {location.user}</h4>                      
                      </div>
                      <div className="avatar">
                        <Avatar
                          src={location.avatar}
                          name={location.user}/>
                      </div>
                      <div className="location-time">
                        <span><strong>{ time }</strong></span>
                        <span><em>{ date }</em></span>
                      </div>
                    </li>
                  )
                }) : null }  
              </ul>            
            
            </StyledLocations>
            ) : null }
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
    locations: selectSortedLocations(state)
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
  color: ${colors.prim_font};
  text-align: center;


  & button {
    width: 80%;
    padding: 10px;
    margin: 10px 10px 0px 10px;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    border: 2px solid ${colors.prim_color};
    background-color: ${colors.prim_light};
    color: grey;
    cursor: pointer;
  }

  & button.active {
    border: 2px solid ${colors.sec_color};
    background-color: ${colors.sec_light};
  }

  & button:last-child {
    margin-bottom: 10px;
  }
`
const StyledContainer= styled.div`
  position: relative;
  display: flex;
  height: 50vh;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`
const StyledMap = styled.div`
  flex-basis: 100%;
`

const StyledLocations = styled.div`
  flex-basis: 30%;

  & ul {
    background-color:${colors.backdrop};
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    max-height: 70vh;
    z-index: 100;
    width: 80%;
    padding: 0;
    margin: 0;
    overflow: auto;
    ::-webkit-scrollbar { 
      display: none;
    }

  }
  & li {
    display: flex;
    justify-content: space-around;
    align-items: center;
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
