import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { profile } from './profile.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  profile,
  alert
});

export default rootReducer;