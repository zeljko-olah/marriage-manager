// REACT
import React from 'react'
import styled from 'styled-components';

// ROUTER - SWITCH ROUTER COMPONENT
import { Router, Switch, Redirect } from 'react-router-dom'

// 3RD PARTY MODULE TO ALLOW COMPONENTS TO HAVE HISTORY PROPS
import createHistory from 'history/createBrowserHistory'

// MAIN ROUTE COMPONENTS
import LoginPage from '../pages/Login.js'
import Dashboard from '../pages/Dashboard.js'

// PRIVATE ROUTES FOR AUTHENTICATED USERS
import PrivateRoute from './PrivateRoute'

// PUBLIC ROUTES FOR GUEST
import PublicRoute from './PublicRoute'

// pass history to every component props
// and export it to be consumed from other files
export const history = createHistory()

// APP ROUTER HOC COMPONENT
const AppRouter = () => (
  <PageWrapper>
    <Router history={history}>
      <div>
        { /* RENDER JUST ONE COMPONENT AT THE TIME */ }
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  </PageWrapper>
)

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#12ddff, transparent 40%), linear-gradient(0deg, Azure, transparent), #ffa949 url("img/hero.jpg") no-repeat center;
  background-size: cover;

`

// EXPORT COMPONENT
export default AppRouter
