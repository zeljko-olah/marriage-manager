// IMPORTS
import React, {Component} from 'react'

import styled from 'styled-components'
import {StyledSection, StyledMainHeading, StyledMainContent} from '../styles/section'
import * as colors from '../styles/variables'

import { connect } from 'react-redux'
import * as actions from '../store/actions'
import {selectSortedLocations} from '../store/selectors/location'

import * as events from '../events'
import {getCoordsCallback} from '../shared/utility'

import Map from '../components/Maps/Map.js'
import Avatar from '../components/user/Avatar'

// COMPONENT
class Location extends Component {

  state = {
    lat: 44.8482181,
    lng: 20.3548942,
    from: '',
    address: 'Home',
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
        lng: location.lng,
        address: 'Home'
      })
    } catch (error) {
      alert(error)
    }
  }
  
  componentDidUpdate = (prevProps) => {
    const { socket, setLocation, lastLocation, setFlashMessage, getLocations } = this.props
    if (socket !== null && prevProps.socket !== socket) {
      socket.on(events.LOCATION_SHARED, (coords, user, address) => {
        setLocation({
          lat: coords.latitude,
          lng: coords.longitude,
          address,
          userId: user.id
        }).then(result => {
          this.setState(result)
          getLocations()
          setFlashMessage({
            type: 'success',
            flashMessage: `${result.from} shared location!`
          })
        })

      })
    }
    if (lastLocation !== prevProps.lastLocation) {
     this.setState({
       lat: lastLocation.lat,
       lng: lastLocation.lng,
       address: lastLocation.address
     })
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
    const { socket, user, setFlashMessage } = this.props

    getCoordsCallback((position) => {
      socket.emit(events.SHARE_LOCATION, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, user, (_) => {
        setFlashMessage({
          type: 'success',
          flashMessage: `You shared location!`
        })
      } )
    })
  }
  
  render () {
    const { lat, lng, recentLocationsOpen, address, createdAt } = this.state
    const { user, locations, activeUsers, lastLocation } = this.props
    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <StyledLocationHeading>
            <div className="last-location">
              <p className="last-address">
                {lastLocation ? lastLocation.address : address}              
              </p>
              <p className="last-time">
                {lastLocation ? lastLocation.createdAt : createdAt}              
              </p>
            </div>
            <div className="actions">
              <button 
                disabled={activeUsers.length !== 2}
                onClick={this.sendLocation}>Share Location</button>
              <button
                className={recentLocationsOpen ? 'active': ''}
                onClick={this.toggleLocations}>Recent Places</button>
            </div>
          </StyledLocationHeading>
        </StyledMainHeading>
  
        <StyledMainContent>
          <StyledContainer>
            { recentLocationsOpen ? (
              <StyledLocations>
              <ul>
                { locations.length ? locations.map((location, index) => {
                  return (
                    <li
                      key={location.id}
                      onClick={() => {this.loadLocation(location, index)}} >
                      <div className="avatar">
                        <Avatar
                          src={location.avatar}
                          name={location.user}/>
                      </div>
                      <div className="address">
                        <h4><strong>{index + 1}. {location.address}</strong></h4>  
                        <div className="location-time">
                          <span><strong>{ location.createdAt }</strong></span>
                        </div>                    
                      </div>
                    </li>
                  )
                }) : (
                <li>
                  <div>
                    <h4>{'No recent locations available'}</h4>                      
                  </div>
                </li>
              ) }  
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
  const allLocations =  selectSortedLocations(state)
  return {
    user: state.auth.user,
    activeUsers: state.chat.activeUsers,
    socket: state.chat.socket,
    location: state.location,
    locations: allLocations,
    lastLocation: allLocations[0]
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
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  color: ${colors.prim_font};
  text-align: center;

  & .last-location {
    flex-basis: 50%;
    margin: 10px 10px 0px 10px;

    & p.last-address,
    & p.last-time {
      font-size: 20px;
      font-weight: bold;
      margin: 5px;
      @media (max-width: 768px) {
        font-size: 15px;
      }
    }

    & p.last-time {
      color: ${colors.prim_color};
      margin-top: 10px;
      font-weight: 900;
      font-size: 16px;
      @media (max-width: 768px) {
        font-size: 13px;
      }
    }

  }


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
    
    &:disabled {
      background-color: ${colors.disabled};
      border-color: ${colors.disabled};
      cursor: not-allowed;
    }
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
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    border: 1px solid ${colors.prim_color};
    background-color: ${colors.prim_light};
    color: grey;
    cursor: pointer;
    transition: all 0.1s ease-in;
  }

  & li:first-child {
    margin-top: 0;
  }

  & li:hover {
    transform: scale(0.95);
    border: 1px solid ${colors.ter_yellow};
  }

  & .location-time span {
    text-align: right;
    display: block;
    font-size: 12px;
    padding-top: 4px;
    color: tomato;
  }

  & .avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin-left: 10px;
  }

  & .address {
    font-size: 15px;
    flex-grow: 1;

    @media (max-width: 768px) {
      font-size: 10px;
    }
    margin: 0;
    padding: 10px;
  }

  & .address h4 {
    margin: 0 0 5px 0;
  }
`
