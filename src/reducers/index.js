import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { passwordReset } from './passwordreset.reducer';
import { profile } from './profile.reducer';
import { userdetails } from './userdetails.reducer';
import { notifications } from './notifications.reducer';
import { comments } from './comments.reducer';
import { alert } from './alert.reducer';
import { userConstants } from '../constants';

const appReducer = combineReducers({
  authentication,
  profile,
  notifications,
  comments,
  userdetails,
  alert,
  passwordReset,
})

const rootReducer = (state, action) => {

  if (action.type === userConstants.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;