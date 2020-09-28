import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managementDocumentFinder state domain
 */

const selectManagementDocumentFinderDomain = state =>
  state.managementDocumentFinder || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagementDocumentFinder
 */

const makeSelectManagementDocumentFinder = () =>
  createSelector(
    selectManagementDocumentFinderDomain,
    substate => substate,
  );

export default makeSelectManagementDocumentFinder;
export { selectManagementDocumentFinderDomain };
