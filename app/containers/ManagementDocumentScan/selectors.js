import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managementDocumentScan state domain
 */

const selectManagementDocumentScanDomain = state =>
  state.managementDocumentScan || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagementDocumentScan
 */



export const makeSelectDocuments = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('documents'),
  );

export const makeSelectIsLoadingDocuments = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('isLoadingDocuments'),
  );

export const makeSelectDocumentTypes = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('documentTypes'),
  );

export const makeSelectIsLoadingDocumentTypes = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('isLoadingDocumentTypes'),
  );

export const makeSelectIsLoadingAddDocumentBarcode = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('isLoadingAddDocumentBarcode'),
  );

export const makeSelectDocumentBarcode = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('documentBarcode'),
  );

export const makeSelectIsLoadingDeleteDocumentBarcode = () =>
  createSelector(
    selectManagementDocumentScanDomain,
    state => state.get('isLoadingDeleteDocumentBarcode'),
  );

export { selectManagementDocumentScanDomain };
