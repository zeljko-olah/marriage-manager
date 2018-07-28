// REACT
import React from 'react';

// REDUX
import { connect } from 'react-redux';

// ROUTER
import { Route, Redirect } from 'react-router-dom';

// AUX
import Aux from '../hoc/Aux'
// NAVIGATION
import Navigation from '../components/Navigation'

// STYLED
import styled from 'styled-components'
import { 
  primary_color,
  backdrop,
  text_shadow,
  box_shadow
 } from '../styles/variables'

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
        { /* NAVIGATION */ }
        <Navigation />
        
        { /* MAIN CONTENT */ }
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
  margin: 30px auto 0;
  
  & section {
    height: 70vh;
    background-color: ${backdrop};
    text-align: center;
    border: 3px solid ${primary_color};
    border-top-left-radius: 20px;
    box-shadow: ${box_shadow}

    & h1 {
      margin: 30px 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid ${primary_color}
      text-shadow: ${text_shadow};
      font-size: 50px;
      @media (max-width: 768px) {
        font-size: 30px;
      }
      font-style: italic;
      color: tomato;
    }
  }


`
