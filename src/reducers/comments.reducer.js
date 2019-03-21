import { userConstants } from '../constants';

export function comments(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSERCOMMENTS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERCOMMENTS_SUCCESS:
      return {
        comments: action.comments
      };
    case userConstants.GETUSERCOMMENTS_FAILURE:
      return { 
        error: 'Could not get user comments for the logged in user'
      };
    default:
      return state
  }
}