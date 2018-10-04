// REACT
import React from 'react'

// ROUTER - SWITCH ROUTER COMPONENT
import { Router, Switch, Redirect, Route } from 'react-router-dom'

// 3RD PARTY MODULE TO ALLOW COMPONENTS UNDER <Router> TO HAVE HISTORY PROPS
import createHistory from 'history/createBrowserHistory'

// STYLED
import styled from 'styled-components'

// MAIN ROUTE COMPONENTS
import LoginPage from '../pages/Login.js'
import Welcome from '../pages/Welcome.js'
import AddNew from '../pages/AddNew.js'
import Todos from '../pages/Todos.js'
import Reminders from '../pages/Reminders.js'
import Location from '../pages/Location.js'

// PRIVATE ROUTES FOR AUTHENTICATED USERS
import PrivateRoute from './PrivateRoute.js'
// PUBLIC ROUTES
import PublicRoute from './PublicRoute.js'

// REACT TRANSITION GROUP
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

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

// EXPORT COMPONENT
export default AppRouter

const TransitionGroupWrapper = styled.div`
.fade-enter {
  opacity: 0.01;
}
.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
.fade-exit {
  opacity: 1;
}

.fade-exit.fade-exit-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}

div.transition-group {
      position: relative;
}
section.route-section {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
`