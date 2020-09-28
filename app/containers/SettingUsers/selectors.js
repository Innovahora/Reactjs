import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingUsers state domain
 */

const selectSettingUsersDomain = state => state.settingUsers || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingUsers
 */

export const makeSelectIsLoadingUsers = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('isLoadingUsers'),
  );

export const makeSelectUsers = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('users'),
  );

export const makeSelectIsLoadingAddUser = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('isLoadingAddUser'),
  );

export const makeSelectIsLoadingProfiles = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('isLoadingProfiles'),
  );

export const makeSelectProfiles = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('profiles'),
  );

export const makeSelectIsLoadingAreas = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('isLoadingAreas'),
  );

export const makeSelectAreas = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('areas'),
  );

export const makeSelectIsLoadingUser = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('isLoadingUser'),
  );

export const makeSelectUser = () =>
  createSelector(
    selectSettingUsersDomain,
    state => state.get('user'),
  );

export { selectSettingUsersDomain };
