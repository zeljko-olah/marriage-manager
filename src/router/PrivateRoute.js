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
import { 
  prim_color,
  backdrop,
  text_shadow,
  box_shadow
 } from '../styles/variables'

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
          <StyledSection>
            <Component {...props} />
          </StyledSection>
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
`
const StyledSection = styled.section`
  background-color: ${backdrop};
  border: 3px solid ${prim_color};
  border-top-left-radius: 20px;
  box-shadow: ${box_shadow};
  
  & h1 {
    text-align: center;
    font-size: 50px;
    @media (max-width: 768px) {
      font-size: 30px;
    }
    font-style: italic;
    padding-bottom: 5px;
    margin: 20px 30px 20px;
    border-bottom: 1px solid ${prim_color}
    text-shadow: ${text_shadow};
    color: tomato;
  }
`
