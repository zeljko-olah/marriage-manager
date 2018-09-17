import React, { Component } from 'react'

// Moment
import moment from 'moment'

// Styled components
import styled from 'styled-components'
import { StyledShadow } from '../../styles/section'
import * as colors from '../../styles/variables'

let countDown

class ReminderTimer extends Component {

  state = {
    timer: 0
  }

  componentDidUpdate (prevProps, prevState) {
    const { reminder } = this.props
    if (prevProps.reminder === null && reminder) {
      this.handleStartTimer(reminder)
    }
    if (prevProps.reminder && prevProps.reminder.id !== reminder.id ) {
      clearInterval(countDown)
      this.handleStartTimer(reminder)

    }
  }

  handleStartTimer = (reminder) => {
    const eventTime = reminder.date
    const currentTime = moment().valueOf()
    const diffTime = eventTime - currentTime
    let duration = moment.duration(diffTime, 'milliseconds')
    console.log(duration)
    const interval = 1000

    countDown = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds');
      let timerString = `
      ${duration.days()} days : ${duration.hours()} hours : ${duration.minutes()} minutes : ${duration.seconds()} seconds
      `
      this.setState({timer: timerString })
    }, interval)
  }

  render() {
    const { reminder } = this.props
    const { timer } = this.state
    return (
      <StyledTimer>
        {reminder && (
          <div className="timer-wrapper">
            <div>
            <h3>{reminder.title}</h3>
            <p>{reminder.who}</p>
            </div>
            <p>{timer}</p>
          </div>
        )}        
      </StyledTimer>
    )
  }
}

export default ReminderTimer

const StyledTimer = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  font-style: italic;

  & .timer-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`
