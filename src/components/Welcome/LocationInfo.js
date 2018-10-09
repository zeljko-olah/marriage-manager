// IMPORTS
import React, { Fragment } from 'react'

import Loading from '../../components/UI/Loading'

import LocationIcon from  'react-icons/lib/md/location-on'

import { StyledShadow } from '../../styles/section'

// COMPONENT
const LocationInfo = ({
  partner,
  history,
  users,
  partnerLastLocation
 }) => {
  return (
    <Fragment>
    { !users.length ? (<Loading/>) : (
      <Fragment>

        { /* LOCATION ICON LINK */ }
        <StyledShadow>
          <StyledShadow onClick={() => {history.push('/location')}}>
            <h2><LocationIcon/></h2>  
          </StyledShadow>
        </StyledShadow>

        { /* PARTNER LAST KNOWN LOCATION */ }
        <StyledShadow>
          <h3>{partner.name}'s last known location was:</h3>
          <h4>{partnerLastLocation ? (
            <span className="last-location">
              { partnerLastLocation.address }
            </span>
          ) : (
            // NO LOCATION DATA AVAILABLE
            <span>{'No data'}</span>
          ) }</h4>
        </StyledShadow>
      </Fragment>
        ) } 
    </Fragment>
  )
}  

export default LocationInfo