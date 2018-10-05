import { createSelector } from 'reselect'
import moment from 'moment'

export const selectUserName = (state) => state.auth.user.name
export const selectAllLocations = (state) => state.location.locations

export const selectSortedLocations = createSelector(
  selectUserName, selectAllLocations, (userName, locations) => {
    if (locations) {
      const sortedLocations = locations
      .filter(l => l.user !== userName)
      .sort((a,b) => {
        return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
      })
      .map(l => {
        l.createdAt = moment(l.createdAt).format('h:mm a, MMM Do')
        return l
      })
      .slice(0, 10)

    return sortedLocations
    } else {
      return []
    }
  }
)

export const selectLastLocation = createSelector(
  selectSortedLocations, (sortedLocations) => {
    return sortedLocations[0]
  }
)

