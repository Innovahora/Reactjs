import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingAreas state domain
 */

const selectSettingAreasDomain = state => state.settingAreas || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingAreas
 */

export const makeSelectIsLoadingAreas = () =>
  createSelector(
    selectSettingAreasDomain,
    state => state.get('isLoadingAreas'),
  );

export const makeSelectAreas = () =>
  createSelector(
    selectSettingAreasDomain,
    state => state.get('areas'),
  );

export const makeSelectIsLoadingAddArea = () =>
  createSelector(
    selectSettingAreasDomain,
    state => state.get('isLoadingAddArea'),
  );

export const makeSelectIsLoadingUsers = () =>
  createSelector(
    selectSettingAreasDomain,
    state => state.get('isLoadingUsers'),
  );

export const makeSelectUsers = () =>
  createSelector(
    selectSettingAreasDomain,
    state => state.get('users'),
  );

export { selectSettingAreasDomain };
