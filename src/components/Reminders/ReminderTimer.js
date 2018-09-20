import React, { Component } from 'react'

// Moment
import moment from 'moment'

// Styled components
import styled from 'styled-components'
import { StyledShadow } from '../../styles/section'
import * as colors from '../../styles/variables'

import Loading from '../../components/UI/Loading'

let countDown

class ReminderTimer extends Component {

  state = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  componentDidUpdate (prevProps, prevState) {
    let indicate = false
    const { reminder } = this.props
    if (prevProps.reminder.id === reminder.id && !indicate) {
      clearInterval(countDown)
      this.handleStartTimer(reminder)
      indicate = true
    }
    if (prevProps.reminder.id !== reminder.id) {
      clearInterval(countDown)
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
    const { reloadReminders } = this.props
    const eventTime = reminder.date
    const currentTime = moment().valueOf()
    const diffTime = eventTime - currentTime
    let duration = moment.duration(diffTime, 'milliseconds')
    const interval = 1000

    countDown = setInterval(() => {
      if (duration._milliseconds < 0) {
        console.log('Here')
        clearInterval(countDown)
        // this.setState({timer: 'expired' })
        reloadReminders()
        return
      } else {
        duration = moment.duration(duration - interval, 'milliseconds')
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
            <div className="timer-headline">
            <h3>Time remains</h3>
            </div>
            <div>
            <StyledShadow>
            { months === 0 && days === 0 && hours === 0 && hours === 0 && minutes === 0 && seconds === 0 && <Loading /> }
            { months !== 0 ?  <p className="month"><span className="count-number">{months}</span> months</p> : null}
            { days !== 0 &&  <p className="days"><span className="count-number">{days}</span> days</p>}
            { months === 0 && hours !== 0 &&  <p className="hours"><span className="count-number">{hours}</span> hours</p>}
            { days === 0 && minutes !== 0 &&  <p className="minutes"><span className="count-number">{minutes}</span> minutes</p>}
            { days === 0 && seconds !== 0 && <p className="seconds"><span className="count-number">{seconds}</span> seconds</p>}
            </StyledShadow>
            </div>
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
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & .timer-headline h3 {
      color: ${colors.prim_color};
      margin-right: 30px;
      text-transform: uppercase;
      font-size: 20px;
      padding: 10px;
      background-color: ${colors.backdrop};
    }

    & p {
      flex: 0 100px auto;
      margin: 3px 0;

      &.month {
        color: ${colors.sec_light};
      }
      &.days {
        color: ${colors.sec_color};
      }
      &.hours {
        color: ${colors.sec_light};
      }
      &.minutes {
        color: ${colors.girl_color};
      }
      &.seconds {
        color: ${colors.boy_color};
      }

      & .count-number {
        position: relative;
        display: inline-block;
        top: 7px;
        font-size: 25px;
        margin-right: 3px;
      }
    }
  }
`
