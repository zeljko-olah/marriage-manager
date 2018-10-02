import React, { Fragment } from 'react'

// Moment
import moment from 'moment'

// Components
import ReminderTimer from '../../components/Reminders/ReminderTimer'
import Loading from '../../components/UI/Loading'

// Icons
import ReminderIcon from  'react-icons/lib/md/alarm'
import AddIcon from  'react-icons/lib/md/add'

// Styles
import { StyledShadow, StyledNoItems } from '../../styles/section'

// Component
const ReminderInfo = ({
  loading,
  history,
  userLastReminder,
  reloadReminder
 }) => {

  return (
    <Fragment>
      { userLastReminder === null || loading ? (<Loading/>) : (
      <Fragment>
        <StyledShadow>
          <StyledShadow onClick={() => {history.push('/reminder')}}>
            <h2><ReminderIcon/></h2>  
          </StyledShadow>
        </StyledShadow>
        { userLastReminder ? (
          <Fragment>
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
            { userLastReminder ? (
              <ReminderTimer
              reminder={userLastReminder}
              redirectTo="/welcome"
              reloadReminder={reloadReminder} />
            ) : null }
          </Fragment>
        ) : (
          <Fragment>
          <StyledNoItems>
            <StyledShadow>
              <h3>No reminders set. Add new?</h3>
              <div
                className="icon"
                onClick={() => {history.push('/add/reminder')}}
              ><AddIcon /></div>
            </StyledShadow>
          </StyledNoItems>
          <div>&nbsp;</div>
          </Fragment>
        ) }
      </Fragment>
      )}
    </Fragment>
  )
}

export default ReminderInfo
