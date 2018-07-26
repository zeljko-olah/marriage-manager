import React, {Component} from 'react'
import styled from 'styled-components'
import { primary_color } from '../styles/variables'


import Header from '../components/Dashboard/Header'
import Todos from '../components/Dashboard/Todos'
import Chat from '../components/Dashboard/Chat'
import News from '../components/Dashboard/News'
import Welcome from '../components/Dashboard/Welcome'


import { connect } from 'react-redux'

class Dashboard extends Component {

  state = {
    active: 'welcome'
  }

  updateActiveHandler = (active) => {
    this.setState({ active: 'chat' })
  }

  render () {
    let showActiveComponent
    switch (this.state.active) {
      case 'welcome':
        showActiveComponent = ( 
          <Welcome user={this.props.user} />
        )
        break
      case 'chat':
        showActiveComponent = ( <Chat />)
        break
      case 'news':
        showActiveComponent = ( <News />)
        break
      case 'todos':
        showActiveComponent = ( <Todos /> )
        break
      default:
        showActiveComponent = ( <Chat /> ) 
    }

    return (
      <div>
        <Header setActive={ this.updateActiveHandler } />
  
        <StyledMain>
          
          { showActiveComponent }
  
        </StyledMain>      
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 600px;
  padding: 10px;
  margin: 50px auto 0;

  & section {
    text-align: center;
    border: 3px solid ${primary_color};
    border-top-left-radius: 20px;
  }


`
// CONNECT REDUX STATE AND ACTIONS TO AUTH COMPONENT
export default connect( mapStateToProps )( Dashboard )
