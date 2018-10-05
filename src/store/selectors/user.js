import { createSelector } from 'reselect'

export const selectUserName = (state) => state.auth.user.name