import { userConstants } from '../constants';

const initialState =  {};

export const passwordReset = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.PASSWORD_RESET:
      return {
        detail: action.detail
      };
    case userConstants.PASSWORD_RESET_SUCCESS:
      return {
        detail: action.detail,
      };
    case userConstants.PASSWORD_RESET_FAILURE:
      return {};

    default:
      return state
  }
}

export default passwordReset;