// IMPORTS
import React, {Component, Fragment} from 'react'

import WithOutsideClick from '../hoc/WithOutsideClick'

import styled from 'styled-components'
import {StyledSection, StyledMainHeading, StyledMainContent, StyledButton, StyledShadow} from '../styles/section'
import * as colors from '../styles/variables'

import { connect } from 'react-redux'
import * as actions from '../store/actions'
import {selectSortedLocations, selectLastLocation} from '../store/selectors/location'
import { selectPartner } from '../store/selectors/chat'

import * as events from '../events'

import Map from '../components/Maps/Map.js'
import Avatar from '../components/user/Avatar'
import Loading from '../components/UI/Loading'

import DeleteIcon from  'react-icons/lib/md/delete'

// COMPONENT
class Location extends Component {

  state = {
    lat: null,
    lng: null,
    from: '',
    address: 'Home',
    id: '',
    createdAt: null,
    recentLocationsOpen: false,
    overide: false
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
      console.log(error)
    }
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    const { 
      socket,
      user,
      lastLocation,
      getLocations,
      getUserCoords,
      setFlashMessage
    } = this.props
    const { lat } = this.state
    
    if (lat === null) {
      getUserCoords(user.id)
        .then(userLocation => {
            this.setState({
              lat: userLocation.lat,
              lng: userLocation.lng,
              address: 'Home'
            })
        })
    }
    if (socket !== null && prevProps.socket !== socket) {
      socket.on(events.LOCATION_SHARED, (loc) => {
        this.setState(loc)
        getLocations()
        setFlashMessage({
          type: 'success',
          flashMessage: `${loc.from} shared location!`
        })
      })
    }
    if (lastLocation && lastLocation !== prevProps.lastLocation) {
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
    const { recentLocationsOpen } = this.state
    this.setState((prevState) => {
      return {recentLocationsOpen: !prevState.recentLocationsOpen}
    })
  }

  closeLocations = () => {
    this.setState({recentLocationsOpen: false})
  }

  loadLocation = (location) => {
    console.log(location)
    this.setState({...location, overide: true})
    this.toggleLocations()
  }
  
  sendLocation = () => {
    const { socket, user, setFlashMessage, setLocation, getUserCoords } = this.props
    getUserCoords(user.id)
      .then(userLocation => {
        setLocation(userLocation)
          .then(loc => {
            socket.emit(events.SHARE_LOCATION, loc, user, (_) => {
              setFlashMessage({
                type: 'success',
                flashMessage: `You shared location!`
              })
            })
        })
      })
  }

  handleClearRecent = (partnerId) => {
    const { clearLocations, getLocations } = this.props
    clearLocations(partnerId).then(() => {
      getLocations()
    })
  }
  
  render () {
    const { lat, lng, recentLocationsOpen, address, createdAt, overide } = this.state
    const { user, partner, locations, lastLocation, loading } = this.props
    return (
      <StyledSection>
        <StyledShadow>
          <StyledShadow>
            <StyledMainHeading user={ user } >
              <h1>Location</h1>

              { /* LOCATION INFO */ }
              <StyledLocationHeading>
                <StyledShadow>
                  <div className="last-location">
                    <p className="last-address">
                      {lastLocation && !overide ? lastLocation.address : address}              
                    </p>
                    <p className="last-time">
                      {lastLocation && !overide ? lastLocation.createdAt : createdAt}              
                    </p>
                  </div>
                </StyledShadow>

                { /* ACTION BUTTONS */ }
                <div className="actions">
                  <StyledButton 
                    onClick={this.sendLocation}>Share Location</StyledButton>

                { /* RECENT PLACES */ }
                <WithOutsideClick executeMethod={this.closeLocations}>
                  <StyledButton
                    className={recentLocationsOpen ? 'active': ''}
                    onClick={this.toggleLocations}>Recent Places
                  </StyledButton>

                  { /* RECENT LOCATIONS */ }
                  { recentLocationsOpen ? (
                      <Fragment>
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
                          }
                          ) : (
                          <li>
                            <div>
                              <h4>{'No recent locations available'}</h4>                      
                            </div>
                          </li>
                        ) }
                        { locations.length ? (
                          <li 
                          className="clear-recent"
                          onClick={() => {this.handleClearRecent(partner.id)}}>Clear Recent<DeleteIcon /></li>
                        ) : null }
                        </ul>            
                    
                      </StyledLocations>
                      </Fragment>
                      ) : null }
                  </WithOutsideClick>
                </div>
              </StyledLocationHeading>
            </StyledMainHeading>
          </StyledShadow>
          
          <StyledMainContent>
            <StyledShadow>
              <StyledContainer>

                { /* LOCATION MAP */ }
                { loading ? (
                  
                  <div className="no-location">Loading... <Loading /></div>
                ) : (
                  <Fragment>
                  { lat && lng ? (
                    <StyledMap>
                      <StyledShadow>
                        <Map
                          lat={lat}
                          lng={lng} />
                      
                      </StyledShadow>
                    </StyledMap>
                  ) : (
                    <StyledMap>
                      <StyledShadow>
                        <h4 className="no-location">Location Feature Not Available</h4>
                      </StyledShadow>
                    </StyledMap>
                  )}
                  </Fragment>
                ) }
              </StyledContainer>
            </StyledShadow>
          </StyledMainContent>
        </StyledShadow>
      </StyledSection>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    partner: selectPartner(state),
    activeUsers: state.chat.activeUsers,
    socket: state.chat.socket,
    location: state.location,
    locations: selectSortedLocations(state),
    lastLocation: selectLastLocation(state),
    loading: state.loading.loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocation: (userLocation) => dispatch(actions.setLocation(userLocation)),
  getUserCoords: (userId) => dispatch(actions.getUserCoords(userId)),
  getLocations: () => dispatch(actions.getLocations()),
  clearLocations: (userId) => dispatch(actions.clearLocations(userId)),
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash))
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Location )

const StyledLocationHeading= styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;;
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

    & p.last-address {
      color: ${colors.prim_color};
    }

    & p.last-time {
      color: ${colors.prim_light};
      margin-top: 10px;
      font-weight: 900;
      font-size: 16px;
      @media (max-width: 768px) {
        font-size: 13px;
      }
    }
  }

  & button {
    width: 100%;
    padding: 10px;
    margin: 10px 10px 0px 10px;
    font-size: 25px;
    @media (max-width: 768px) {
      font-size: 15px;
    }
    
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
`
const StyledContainer= styled.div`
  position: relative;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

  & .no-location {
    text-align: center;
    color: ${colors.prim_light};
  }
`
const StyledMap = styled.div`
  flex-basis: 100%;
`

const StyledLocations = styled.div`
  flex-basis: 30%;
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 110%;
  transform: translate(-50%);

  & ul {
    background-color:${colors.backdrop};
    max-height: 70vh;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: auto;
    list-style-type: none;
    ::-webkit-scrollbar { 
      display: none;
    }
  }

  & li {
    width: 300px;
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
    transform: scale(0.99);
    border: 1px solid ${colors.ter_yellow};
  }

  & .location-time span {
    text-align: right;
    display: block;
    font-size: 12px;
    padding-top: 4px;
    color: tomato;
  }

  & .clear-recent {
    justify-content: center;
    padding: 10px;
    text-transform: uppercase;

    & svg {
      color: ${colors.sec_light};
      font-size: 30px;

      &:hover {
        color: ${colors.sec_color};
        transform: scale(1.2);
      }
    }
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
