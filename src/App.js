import React, { Component } from 'react';

import 'normalize.css/normalize.css';
import styled, { injectGlobal } from 'styled-components';

import AppRouter from './router/AppRouter';

class App extends Component {
  render() {
    return (
      <PageWrapper>
        { /* APP ROUTER */ }
        <AppRouter />
      </PageWrapper>
    );
  }
}


injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
  }
`

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#12ddff, transparent 40%), linear-gradient(0deg, Azure, transparent), url("img/hero.jpg") no-repeat center;
  background-size: cover;
`
export default App;
