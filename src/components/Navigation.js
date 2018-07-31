import React, { Component } from 'react'

import Aux from '../hoc/Aux'
import Header from './Navigation/Header'
import Sidebar from './Navigation/Sidebar'

class Navigation extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState( (prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
  
  render() {
    const { showSideDrawer } = this.state
    return (
      <Aux>

        { /* HEADER */ }
        <Header
          show={showSideDrawer}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />

        { /* SIDEBAR */ }
        <Sidebar
          open={showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
      </Aux>
    )
  }
}

export default Navigation