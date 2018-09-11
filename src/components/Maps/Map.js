import React, { PureComponent } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps'

import mapStyles from './styles.json'

class Map extends PureComponent {
    
   render() {

   const { lat, lng } = this.props
   const GoogleMapWrapper = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat, lng: lng } }
        defaultZoom = { 16 }
        defaultOptions={{ styles: mapStyles }}
      >
        <Marker
          position={{lat, lng}}
        />
      </GoogleMap>
   )))
   return(
      <div>
        <GoogleMapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw-v2qMe3SY_AQcfMFYrNu2P4L1H8Z0vc"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={ <div style={{ height: `400px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   )
   }
}
export default Map