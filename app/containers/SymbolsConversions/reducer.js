/*
 *
 * SymbolsConversions reducer
 *
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
} from './constants';

export const initialState = fromJS({
  isLoadingUpdateSettings: false,
});

const symbolsConversionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return state.set('isLoadingUpdateSettings', true);
    case UPDATE_SETTINGS_SUCCESS:
      return state.set('isLoadingUpdateSettings', false);
    case UPDATE_SETTINGS_FAIL:
      return state.set('isLoadingUpdateSettings', false);
    default:
      return state;
  }
};

export default symbolsConversionsReducer;
