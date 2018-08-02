import React, { Component } from 'react'

import 'normalize.css/normalize.css'
import styled, { injectGlobal } from 'styled-components'

import AppRouter from './router/AppRouter'
import ChatWrapper from './chat/ChatWrapper'

import { connect } from 'react-redux'
import {socketInit} from './store/actions/index'

class App extends Component {
  
  render() {
    return (
      <PageWrapper>
        { /* APP ROUTER */ }
        <AppRouter />
        
        { /* CHAT */ }
        <ChatWrapper />

      </PageWrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(socketInit(socket))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// Define global styles
injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Cardo, sans-serif;
  }
`
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#12ddff, transparent 40%), linear-gradient(0deg, Azure, transparent), url("img/hero.jpg") no-repeat center;
  background-size: cover;
`