import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingCreateUser state domain
 */

const selectSettingCreateUserDomain = state =>
  state.settingCreateUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingCreateUser
 */

export const makeSelectIsLoadingAddUser = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('isLoadingAddUser'),
  );

export const makeSelectIsLoadingProfiles = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('isLoadingProfiles'),
  );

export const makeSelectProfiles = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('profiles'),
  );

export const makeSelectIsLoadingAreas = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('isLoadingAreas'),
  );

export const makeSelectAreas = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('areas'),
  );

export const makeSelectIsLoadingUser = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('isLoadingUser'),
  );

export const makeSelectUser = () =>
  createSelector(
    selectSettingCreateUserDomain,
    state => state.get('user'),
  );

export { selectSettingCreateUserDomain };
