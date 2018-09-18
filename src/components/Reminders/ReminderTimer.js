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
    // timer: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  componentDidUpdate (prevProps, prevState) {
    // clearInterval(countDown)
    const { reminder } = this.props
    if (prevProps.reminder === null && reminder) {
      this.handleStartTimer(reminder)
    }
    if (prevProps.reminder && reminder && prevProps.reminder.id !== reminder.id ) {
      clearInterval(countDown)
      this.handleStartTimer(reminder)
    }
  }

  componentWillUnmount() {
    clearInterval(countDown)
  }

  handleStartTimer = (reminder) => {
    const eventTime = reminder.date
    const currentTime = moment().valueOf()
    const diffTime = eventTime - currentTime
    let duration = moment.duration(diffTime, 'milliseconds')
    const interval = 1000

    countDown = setInterval(() => {
      if (duration._milliseconds < 0) {
        clearInterval(countDown)
        this.setState({timer: 'expired' })
      } else {
        duration = moment.duration(duration - interval, 'milliseconds')
        let timerString = `
        ${duration.months()} months : 
        ${duration.days()} days : 
        ${duration.hours()} hours : 
        ${duration.minutes()} minutes : 
        ${duration.seconds()} seconds
        `
        this.setState({
          months: duration.months(),
          days: duration.days(),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        })        
      }
    }, interval)
  }

  render() {
    const { reminder } = this.props
    const { months, days, hours, minutes, seconds } = this.state
    return (
      <StyledTimer>
        {reminder && (
          <div className="timer-wrapper">
           { months !== 0 &&  <p>{months} months</p>}
           { days !== 0 &&  <p>{days} days</p>}
           { hours !== 0 &&  <p>{hours} hours</p>}
           { minutes !== 0 &&  <p>{minutes} minutes</p>}
           { seconds !== 0 && <p>{seconds} seconds</p>}
          </div>
        )}        
      </StyledTimer>
    )
  }
}

export default ReminderTimer

const StyledTimer = styled.div`
  position: absolute;
  display: inline-block;
  right: 50px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  font-style: italic;

  & .timer-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & p {
      flex: 0 100px auto;
    }
  }
`
