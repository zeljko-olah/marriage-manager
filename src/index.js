// Main import
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Import Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Reducers
import authReducer from './store/reducers/auth'
import chatReducer from './store/reducers/chat'
import locationReducer from './store/reducers/location'
import todoReducer from './store/reducers/todo'
import reminderReducer from './store/reducers/reminder'
import loadingReducer from './store/reducers/loading'

// Styles

// ACTION CREATORS
// import {authCheckState, socketInit} from './store/actions/index'
import {authCheckState} from './store/actions/index'

// Redux devtools
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

// Reducers
const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    location: locationReducer,
    todo: todoReducer,
    reminder: reminderReducer,
    loading: loadingReducer
})

// Define store
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

store.dispatch(authCheckState())
// store.dispatch(socketInit())

// Inject redux
const appRedux = (
    <Provider store={store}>
      <App />
    </Provider>
)

ReactDOM.render(appRedux, document.getElementById('root'))
registerServiceWorker()
