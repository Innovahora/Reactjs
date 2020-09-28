/*
 *
 * ManagementDocumentUpload reducer
 *
 */
import { fromJS } from 'immutable';

import {
  GET_DOCUMENT_TYPES,
  GET_DOCUMENT_TYPES_SUCCESS,
  GET_DOCUMENT_TYPES_FAIL,
  GET_AREAS,
  GET_AREAS_SUCCESS,
  GET_AREAS_FAIL,
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_DOCUMENT_BARCODE,
  GET_DOCUMENT_BARCODE_SUCCESS,
  GET_DOCUMENT_BARCODE_FAIL,
  GET_DOCUMENT_FIELS,
  GET_DOCUMENT_FIELS_SUCCESS,
  GET_DOCUMENT_FIELS_FAIL,
} from './constants';

export const initialState = fromJS({
  isLoadingDocumentBarcode: false,
  isLoadingDocumentFiels: false,
  isLoadingDocumentTypes: false,
  isLoadingAddDocument: false,
  isLoadingUsers: false,
  isLoadingAreas: false,
  documentFields: [],
  documentTypes: [],
  areas: [],
  users: [],
  barcode: null,
});

const managementDocumentUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENT_TYPES:
      return state.set('isLoadingDocumentTypes', true).set('documentTypes', []);
    case GET_DOCUMENT_TYPES_SUCCESS:
      return state
        .set('isLoadingDocumentTypes', false)
        .set('documentTypes', action.payload.items);
    case GET_DOCUMENT_TYPES_FAIL:
      return state.set('isLoadingDocumentTypes', false);
    case GET_AREAS:
      return state.set('isLoadingAreas', true).set('areas', []);
    case GET_AREAS_SUCCESS:
      return state
        .set('isLoadingAreas', false)
        .set('areas', action.payload.items);
    case GET_AREAS_FAIL:
      return state.set('isLoadingAreas', false);
    case ADD_DOCUMENT:
      return state.set('isLoadingAddDocument', true);
    case ADD_DOCUMENT_SUCCESS:
      return state.set('isLoadingAddDocument', false);
    case ADD_DOCUMENT_FAIL:
      return state.set('isLoadingAddDocument', false);
    case GET_USERS:
      return state.set('isLoadingUsers', true).set('users', []);
    case GET_USERS_SUCCESS:
      return state
        .set('isLoadingUsers', false)
        .set('users', action.payload.items);
    case GET_USERS_FAIL:
      return state.set('isLoadingUsers', false);
    case GET_DOCUMENT_BARCODE:
      return state.set('isLoadingDocumentBarcode', true).set('barcode', null);
    case GET_DOCUMENT_BARCODE_SUCCESS:
      return state
        .set('isLoadingDocumentBarcode', false)
        .set('barcode', action.payload);
    case GET_DOCUMENT_BARCODE_FAIL:
      return state.set('isLoadingDocumentBarcode', false);
    case GET_DOCUMENT_FIELS:
      return state.set('isLoadingDocumentFiels', true);
    case GET_DOCUMENT_FIELS_SUCCESS:
      return state.set('isLoadingDocumentFiels', false)
        .set('documentFields', action.payload.items);
    case GET_DOCUMENT_FIELS_FAIL:
      return state.set('isLoadingDocumentFiels', false);
    default:
      return state;
  }
};

export default managementDocumentUploadReducer;
