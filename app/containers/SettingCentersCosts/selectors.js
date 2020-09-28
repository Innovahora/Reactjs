import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingCentersCosts state domain
 */

const selectSettingCentersCostsDomain = state =>
  state.settingCentersCosts || initialState;

/**
 * Other specific selectors
 */

export const makeSelectCentersCost = () =>
  createSelector(
    selectSettingCentersCostsDomain,
    state => state.get('centersCost'),
  );

export const makeSelectIsLoadingCentersCost = () =>
  createSelector(
    selectSettingCentersCostsDomain,
    state => state.get('isLoadingCentersCost'),
  );

export const makeSelectIsLoadingAddCentersCost = () =>
  createSelector(
    selectSettingCentersCostsDomain,
    state => state.get('isLoadingAddCenterCost'),
  );

export const makeSelectIsLoadingDeleteCentersCost = () =>
  createSelector(
    selectSettingCentersCostsDomain,
    state => state.get('isLoadingDeleteCenterCost'),
  );

export { selectSettingCentersCostsDomain };
