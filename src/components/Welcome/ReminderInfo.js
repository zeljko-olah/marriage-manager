import React, { Fragment } from 'react'

// Moment
import moment from 'moment'

// Components
import ReminderTimer from '../../components/Reminders/ReminderTimer'
import Loading from '../../components/UI/Loading'

// Icons
import ReminderIcon from  'react-icons/lib/md/alarm'

// Styles
import { StyledShadow } from '../../styles/section'

// Component
const ReminderInfo = ({
  loading,
  history,
  userLastReminder,
 }) => {
  return (
    <Fragment>
      { !userLastReminder || loading ? (<Loading/>) : (
      <Fragment>
        <StyledShadow>
          <StyledShadow onClick={() => {history.push('/reminder')}}>
            <h2><ReminderIcon/></h2>  
          </StyledShadow>
        </StyledShadow>
        <div>
        <StyledShadow>
          <StyledShadow>
            <h3>
            Reminder for <span className="reminder-who">{userLastReminder.who}</span>
            </h3>
            <h4>
              <span className="last-reminder">
                { userLastReminder.title }
              </span>
            </h4>
            <h4 className="last-reminder-time">
              <span>
                { moment(userLastReminder.date).format('MMM Do') }
              </span>
            </h4>
          </StyledShadow>
        </StyledShadow>
        </div>
        { /* REMIDER TIMER */ }
        <ReminderTimer
          reminder={userLastReminder}
          redirectTo="/welcome" />
      </Fragment>
      )}
    </Fragment>
  )
}

export default ReminderInfo
