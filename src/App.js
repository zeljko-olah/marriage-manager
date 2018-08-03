import React from 'react'

import 'normalize.css/normalize.css'
import styled, { injectGlobal } from 'styled-components'

import AppRouter from './router/AppRouter'
import ChatWrapper from './chat/components/ChatWrapper'

const App = () => {
  return (
    <PageWrapper>
      { /* APP ROUTER */ }
      <AppRouter />
      
      { /* CHAT */ }
      <ChatWrapper />

    </PageWrapper>
  )
}

export default App

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
  background: linear-gradient(#12ddff, transparent 40%), linear-gradient(0deg, Azure, transparent), url("uploads/hero.jpg") no-repeat center;
  background-size: cover;
`