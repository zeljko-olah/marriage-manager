// REACT
import React, {Fragment} from 'react';

// REDUX
import { connect } from 'react-redux';

// ROUTER
import { Route, Redirect } from 'react-router-dom';

// NAVIGATION
import Navigation from '../components/Navigation'

// STYLED
import styled from 'styled-components'

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
      <Fragment>
        { /* NAVIGATION */ }
        <Navigation />
        
        { /* MAIN CONTENT */ }
        <StyledMain>
          <Component {...props} />
        </StyledMain>
      
      </Fragment>
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

// STYLED
const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 600px;
  padding: 10px;
  margin: 30px auto 0;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`
