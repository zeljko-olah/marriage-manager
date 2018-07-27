// REACT
import React from 'react';

// REDUX
import { connect } from 'react-redux';

// ROUTER
import { Route, Redirect } from 'react-router-dom';

// HEADER
import Header from '../components/Header'
// AUX
import Aux from '../hoc/Aux'

// STYLED
import styled from 'styled-components'
import { primary_color } from '../styles/variables'

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
      <Aux>
        <Header/>
        
        <StyledMain>

          <Component {...props} />
        </StyledMain>
      
      </Aux>
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
  margin: 50px auto 0;

  & section {
    text-align: center;
    border: 3px solid ${primary_color};
    border-top-left-radius: 20px;
  }


`
