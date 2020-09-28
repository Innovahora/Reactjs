import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentTypes state domain
 */

const selectDocumentTypesDomain = state => state.documentTypes || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentTypes
 */

export const makeSelectDocumentTypes = () =>
  createSelector(
    selectDocumentTypesDomain,
    state => state.get('documentTypes'),
  );

export const makeSelectIsLoadingDocumentTypes = () =>
  createSelector(
    selectDocumentTypesDomain,
    state => state.get('isLoadingDocumentTypes'),
  );

export const makeSelectIsLoadingAddDocumentType = () =>
  createSelector(
    selectDocumentTypesDomain,
    state => state.get('isLoadingAddDocumentType'),
  );

export const makeSelectIsLoadingDeleteDocumentType = () =>
  createSelector(
    selectDocumentTypesDomain,
    state => state.get('isLoadingDeleteDocumentType'),
  );

export { selectDocumentTypesDomain };
