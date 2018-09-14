import { createSelector } from 'reselect'
import moment from 'moment'

export const selectUserName = (state) => state.auth.user.name
export const selectAllReminders = (state) => state.reminder.reminders

export const selectRelevantRemindersFirst = createSelector(
  selectAllReminders, (allReminders) => {
    if (allReminders) {
      return allReminders
      .sort((a,b) => moment(a.date).valueOf() - moment(b.date).valueOf())
      .filter(r => {
        return moment(r.date).subtract(1, 'days').isSameOrAfter(moment(), 'day')
      } )
    } else {
      return []
    }
  }
)

export const selectTodaysReminders = createSelector(
  selectAllReminders, (allReminders) => {
    if (allReminders) {
      return allReminders
      .filter(r => {
        return moment(r.date).isSame(moment(), 'day')
      } )
    } else {
      return []
    }
  }
)

export const selectExpiredReminders = createSelector(
  selectAllReminders, (allReminders) => {
    if (allReminders) {
      return allReminders
      .filter(r => {
        return moment(r.date).add(1, 'days').isSameOrBefore(moment(), 'day')
      } )
    } else {
      return []
    }
  }
)