import { userConstants } from '../constants';

export function userdetails(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSERDETAILS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERDETAILS_SUCCESS:
      return {
        user_info: action.user_information
      };
    case userConstants.GETUSERDETAILS_FAILURE:
      return { 
        error: 'Could not get current user information'
      };
    default:
      return state
  }
}