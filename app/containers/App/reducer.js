/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { fromJS } from 'immutable';

import {
  CLOSE_SESION,
  CLOSE_SESION_SUCCESS,
  CLOSE_SESION_FAIL
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  isLoadingCloseSesion: false,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_SESION:
      return state.set('isLoadingCloseSesion', true);
    case CLOSE_SESION_SUCCESS:
      return state.set('isLoadingCloseSesion', false);
    case CLOSE_SESION_FAIL:
      return state.set('isLoadingCloseSesion', false);
    default:
      return state;
  }
};

export default appReducer;