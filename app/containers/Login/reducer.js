/*
 *
 * Login reducer
 *
 */
import { fromJS } from 'immutable';

import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from './constants';

export const initialState = fromJS({
  isLoadingLoginUser: false,
});

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return state.set('isLoadingLoginUser', true);
    case LOGIN_USER_SUCCESS:
      return state.set('isLoadingLoginUser', false);
    case LOGIN_USER_FAIL:
      return state.set('isLoadingLoginUser', false);
    default:
      return state;
  }
};

export default loginReducer;
