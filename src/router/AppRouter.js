// REACT
import React from 'react'

// ROUTER - SWITCH ROUTER COMPONENT
import { Router, Switch, Redirect } from 'react-router-dom'

// 3RD PARTY MODULE TO ALLOW COMPONENTS TO HAVE HISTORY PROPS
import createHistory from 'history/createBrowserHistory'

// MAIN ROUTE COMPONENTS
import LoginPage from '../pages/Login.js'
import Welcome from '../pages/Welcome.js'
import NewPerson from '../pages/NewPerson.js'
import Todos from '../pages/Todos.js'
import Reminder from '../pages/Reminder.js'
import Location from '../pages/Location.js'

// PRIVATE ROUTES FOR AUTHENTICATED USERS
import PrivateRoute from './PrivateRoute'
// PUBLIC ROUTES
import PublicRoute from './PublicRoute'

// pass history to every component props
// and export it to be consumed from other files
export const history = createHistory()

// APP ROUTER HOC COMPONENT
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
      <PublicRoute path="/" component={LoginPage} exact={true} />
      <PrivateRoute path="/welcome" component={Welcome} />
      <PrivateRoute path="/todos" component={Todos} />
      <PrivateRoute path="/add" component={NewPerson} />
      <PrivateRoute path="/reminder" component={Reminder} />
      <PrivateRoute path="/location" component={Location} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

// EXPORT COMPONENT
export default AppRouter
