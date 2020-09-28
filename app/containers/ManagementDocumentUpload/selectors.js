import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managementDocumentUpload state domain
 */

const selectManagementDocumentUploadDomain = state =>
  state.managementDocumentUpload || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagementDocumentUpload
 */

export const makeSelectDocumentTypes = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('documentTypes'),
  );

export const makeSelectIsLoadingDocumentTypes = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('isLoadingDocumentTypes'),
  );

export const makeSelectIsLoadingAreas = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('isLoadingAreas'),
  );

export const makeSelectAreas = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('areas'),
  );

export const makeSelectIsLoadingAddDocument = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('isLoadingAddDocument'),
  );

export const makeSelectIsLoadingUsers = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('isLoadingUsers'),
  );

export const makeSelectUsers = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('users'),
  );

export const makeSelectIsLoadingDocumentBarcode = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('isLoadingDocumentBarcode'),
  );

export const makeSelectDocumentBarcode = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('barcode'),
  );

export const makeSelectIsLoadingDocumentFields = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('isLoadingDocumentFiels'),
  );

export const makeSelectDocumentFields = () =>
  createSelector(
    selectManagementDocumentUploadDomain,
    state => state.get('documentFields'),
  );

export { selectManagementDocumentUploadDomain };
