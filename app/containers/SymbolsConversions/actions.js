/*
 *
 * SymbolsConversions actions
 *
 */

import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
} from './constants';

export function updateSettings(payload) {
  return {
    type: UPDATE_SETTINGS,
    payload,
  };
}

export function updateSettingsSuccess(payload) {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
    payload,
  };
}

export function updateSettingsFail(payload) {
  return {
    type: UPDATE_SETTINGS_FAIL,
    payload,
  };
}
