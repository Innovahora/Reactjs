import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */
export const makeSelectIsLoadingLogin = () =>
  createSelector(
    selectLoginDomain,
    state => state.get('isLoadingLoginUser'),
  );

export { selectLoginDomain };
