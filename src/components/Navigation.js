import React, { Component } from 'react'


import Aux from '../hoc/Aux'
// HEADER
import Header from './Navigation/Header'
import Sidebar from './Navigation/Sidebar'

export default class Navigation extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    console.log('CALLED')
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState( (prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
  render() {
    return (
      <Aux>
        <Header
          show={this.state.showSideDrawer}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />

        <Sidebar
          open={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
      </Aux>
    )
  }
}
