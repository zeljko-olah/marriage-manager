// REACT
import React from 'react'

// ROUTER - SWITCH ROUTER COMPONENT
import { Router, Switch, Redirect } from 'react-router-dom'

// 3RD PARTY MODULE TO ALLOW COMPONENTS UNDER <Router> TO HAVE HISTORY PROPS
import createHistory from 'history/createBrowserHistory'

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
      <PrivateRoute path="/add" component={AddNew} />
      <PrivateRoute path="/reminder" component={Reminders} />
      <PrivateRoute path="/location" component={Location} />
      <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

// EXPORT COMPONENT
export default AppRouter
