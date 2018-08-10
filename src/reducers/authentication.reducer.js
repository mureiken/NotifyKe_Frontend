import { userConstants } from '../constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};


export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        username: action.username
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

const persistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['loggingIn']
};

export default persistReducer(persistConfig, authentication);
