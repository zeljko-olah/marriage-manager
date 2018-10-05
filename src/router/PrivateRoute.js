// REACT
import React from 'react';

// REDUX
import { connect } from 'react-redux';

// ROUTER
import { Route, Redirect } from 'react-router-dom';

/*
 * DEFINE PRIVATE ROUTE COMPONENT
 * @props {boolean} isAuthenticated - if user is authenticated
 * @props {React Component} - component to render when route is matched
 * @props { ...rest } - rest of the props spreaded
 * @returns {<Route />} - Configured Route component
 */
export const PrivateRoute = ({
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
      <div>
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  );

  // Return Route Component
  return (
    <Route {...rest} component={cmp} />
  );
};

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  // check if user id exist on the state and cast it to boolean
  isAuthenticated: !!state.auth.user
});

// EXPORT CONNECTED COMPONENT
export default connect(mapStateToProps)(PrivateRoute);
