import { userConstants } from '../constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};


export const registration = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTRATION_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.REGISTRATION_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        username: action.user.email
      };
    case userConstants.REGISTRATION_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

