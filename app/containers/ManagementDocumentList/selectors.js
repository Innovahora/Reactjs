import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managementDocumentList state domain
 */

const selectManagementDocumentListDomain = state =>
  state.managementDocumentList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagementDocumentList
 */

export const makeSelectDocuments = () =>
  createSelector(
    selectManagementDocumentListDomain,
    state => state.get('documents'),
  );

export const makeSelectIsLoadingDocuments = () =>
  createSelector(
    selectManagementDocumentListDomain,
    state => state.get('isLoadingDocuments'),
  );

export const makeSelectDocumentTypes = () =>
  createSelector(
    selectManagementDocumentListDomain,
    state => state.get('documentTypes'),
  );

export const makeSelectIsLoadingDocumentTypes = () =>
  createSelector(
    selectManagementDocumentListDomain,
    state => state.get('isLoadingDocumentTypes'),
  );

export { selectManagementDocumentListDomain };
