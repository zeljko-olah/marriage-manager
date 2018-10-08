import React, { Component, Fragment } from 'react'

// Moment
import moment from 'moment'
import {history} from '../../router/AppRouter'

// Styled components
import styled from 'styled-components'
import * as colors from '../../styles/variables'

import Loading from '../../components/UI/Loading'

let countDown

class ReminderTimer extends Component {

  state = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  componentDidUpdate (prevProps) {
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
    const eventTime = reminder.date
    const currentTime = moment().valueOf()
    const diffTime = eventTime - currentTime
    let duration = moment.duration(diffTime, 'milliseconds')
    let interval = 1000

    if (duration._milliseconds < 0) {
      this.handleReloadReminder()      
      return
    } else {
      countDown = setInterval(() => {
        duration = moment.duration(duration - interval, 'milliseconds')
        this.setState({
          months: duration.months(),
          days: duration.days(),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        })
        if (duration.months() !== 0 || (duration.days() !== 0 && duration.months() === 0)) {
          clearInterval(countDown)
        }     
      }, interval)
    }
  }

  handleReloadReminder = () => {
    const { reloadReminder, redirectTo } = this.props
    if (redirectTo === '/welcome') {
      reloadReminder()
    } else {
      history.push('/reminder')
    }
  }

  render() {
    const { reminder, redirectTo } = this.props
    const { months, days, hours, minutes, seconds } = this.state
    
    return (
      <StyledTimer redirectTo={redirectTo}>
        {reminder && (
          <div className="timer-wrapper">
            <div className="timer-headline">
            <h3>Time remaining</h3>
            </div>
            <div>
              { months === 0 && days === 0 && hours === 0 && hours === 0 && minutes === 0 && seconds === 0 ? <Loading /> : (
                <Fragment>
                  { months !== 0 ?  <p className="month"><span className="count-number">{months}</span> { months === 1 ? 'month' : 'months'}</p> : null}
                  { days !== 0 &&  <p className="days"><span className="count-number">{days}</span> { days === 1 ? 'day' : 'days'}</p>}
                  { months === 0 && hours !== 0 &&  <p className="hours"><span className="count-number">{hours}</span> { hours === 1 ? 'hour' : 'hours'}</p>}
                  { days === 0 && minutes !== 0 &&  <p className="minutes"><span className="count-number">{minutes}</span> { minutes === 1 ? 'minute' : 'minutes'}</p>}
                  { months === 0 && days === 0 && seconds !== 0 && <p className="seconds"><span className="count-number">{seconds}</span> { seconds === 1 ? 'second' : 'seconds'}</p>
                  }
                </Fragment>
              ) }
            </div>
          </div>
        )}        
      </StyledTimer>
    )
  }
}

export default ReminderTimer

const StyledTimer = styled.div`
  ${props => {
    return props.redirectTo === '/reminder' && 'position: absolute'
  }}
  @media (max-width: 768px) {
    position: static;
    width: 100%;
  }
  
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
      @media (max-width: 768px) {
        font-size: 15px;
        margin-right: 10px;
      }
      padding: 10px;
    }

    & p {
      flex: 0 100px auto;
      margin: 3px 0;
      position: relative;
      top: -5px;

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
        font-size: 20px;
        margin-right: 3px;
      }
    }
  }
`
