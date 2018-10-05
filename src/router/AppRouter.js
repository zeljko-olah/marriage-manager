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
  <Router history={history}>
    <Route render={({location}) => (
      <TransitionGroupWrapper>
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames='fade' >
            <section className="route-section">
              <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/welcome" component={Welcome} />
                <PrivateRoute path="/todos" component={Todos} />
                <PrivateRoute path="/add" component={AddNew} />
                <PrivateRoute path="/reminder" component={Reminders} />
                <PrivateRoute path="/location" component={Location} />
                <Redirect to="/" />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      </TransitionGroupWrapper>
    )} />
  </Router>
)

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#12ddff, transparent 40%), linear-gradient(0deg, Azure, transparent), #ffa949 url("img/hero.jpg") no-repeat center;
  background-size: cover;

`

// EXPORT COMPONENT
export default AppRouter
