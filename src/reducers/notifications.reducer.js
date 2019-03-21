import { userConstants } from '../constants';

export function notifications(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSERNOTIFICATIONS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERNOTIFICATIONS_SUCCESS:
      return {
        notifications: action.notifications
      };
    case userConstants.GETUSERNOTIFICATIONS_FAILURE:
      return { 
        error: 'Could not get TBT notifications for the logged in user'
      };
    default:
      return state
  }
}