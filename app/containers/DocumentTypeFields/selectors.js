import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentTypeFields state domain
 */

const selectDocumentTypeFieldsDomain = state =>
  state.documentTypeFields || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentTypeFields
 */

export const makeSelectIsLoadingAddDocumentFields = () =>
  createSelector(
    selectDocumentTypeFieldsDomain,
    state => state.get('isLoadingAddFields'),
  );

export { selectDocumentTypeFieldsDomain };
