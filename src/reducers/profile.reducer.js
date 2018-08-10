import { userConstants } from '../constants';

export function profile(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSERPROFILE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERPROFILE_SUCCESS:
      return {
        profile: action.profile
      };
    case userConstants.GETUSERPROFILE_FAILURE:
      return { 
        error: 'Could not get current user profile'
      };
    default:
      return state
  }
}