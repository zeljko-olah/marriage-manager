// IMPORTS
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

/*
 * Define PublicRoute component
 * @props {boolean} isAuthenticated - if user is authenticated
 * @props {React Component} - component to render when route is matched
 * @props { ...rest } - rest of the props spreaded
 * @returns {<Route />} - Configured Route component
 */
export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  /*
   * Structure custom component to pass to <Route /> component
   * depending on auth state
   */
  const cmp = (props) => (
    isAuthenticated ? (
      // if user is auth REDIRECT to dashboard
      <Redirect to = "/welcome" />
    ) : (
      // otherwise render the COMPONENT
      <Component { ...props} />
    )
  )

  // return ROUTE COMPONENT - And pass component to render
  return (
    <Route { ...rest} component={cmp} />
  )
}

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  // if user is auth casted to boolean
  isAuthenticated: !!state.auth.user
})

// EXPORT CONNECTED COMPONENT
export default connect(mapStateToProps)(PublicRoute)
