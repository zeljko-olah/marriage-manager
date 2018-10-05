import * as actionTypes from './actionTypes'

// LOADING ACTION
export const setLoading = (loading) => {
  return {
      type: actionTypes.LOADING,
      loading
  }
}