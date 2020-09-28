import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentaryManagement state domain
 */

const selectDocumentaryManagementDomain = state =>
  state.documentaryManagement || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentaryManagement
 */

const makeSelectDocumentaryManagement = () =>
  createSelector(
    selectDocumentaryManagementDomain,
    substate => substate,
  );

export default makeSelectDocumentaryManagement;
export { selectDocumentaryManagementDomain };
