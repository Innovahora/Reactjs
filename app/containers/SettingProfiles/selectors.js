import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingProfiles state domain
 */

const selectSettingProfilesDomain = state =>
  state.settingProfiles || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingProfiles
 */

export const makeSelectIsLoadingProfiles = () =>
  createSelector(
    selectSettingProfilesDomain,
    state => state.get('isLoadingProfiles'),
  );

export const makeSelectProfiles = () =>
  createSelector(
    selectSettingProfilesDomain,
    state => state.get('profiles'),
  );

export const makeSelectIsLoadingAddProfile = () =>
  createSelector(
    selectSettingProfilesDomain,
    state => state.get('isLoadingAddProfile'),
  );

export const makeSelectIsLoadingDeleteProfile = () =>
  createSelector(
    selectSettingProfilesDomain,
    state => state.get('isLoadingDeleteProfile'),
  );

export const makeSelectIsLoadingModules = () =>
  createSelector(
    selectSettingProfilesDomain,
    state => state.get('isLoadingModules'),
  );

export const makeSelectModules = () =>
  createSelector(
    selectSettingProfilesDomain,
    state => state.get('modules'),
  );

export { selectSettingProfilesDomain };
