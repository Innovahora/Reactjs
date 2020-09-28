/*
 *
 * ManagementDocumentUpload actions
 *
 */

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

export function getDocumentTypes(payload) {
  return {
    type: GET_DOCUMENT_TYPES,
    payload,
  };
}

export function getDocumentTypesSuccess(payload) {
  return {
    type: GET_DOCUMENT_TYPES_SUCCESS,
    payload,
  };
}

export function getDocumentTypesFail(payload) {
  return {
    type: GET_DOCUMENT_TYPES_FAIL,
    payload,
  };
}

export function getAreas(payload) {
  return {
    type: GET_AREAS,
    payload,
  };
}

export function getAreasSuccess(payload) {
  return {
    type: GET_AREAS_SUCCESS,
    payload,
  };
}

export function getAreasFail(payload) {
  return {
    type: GET_AREAS_FAIL,
    payload,
  };
}

export function addDocument(payload) {
  return {
    type: ADD_DOCUMENT,
    payload,
  };
}

export function addDocumentSuccess(payload) {
  return {
    type: ADD_DOCUMENT_SUCCESS,
    payload,
  };
}

export function addDocumentFail(payload) {
  return {
    type: ADD_DOCUMENT_FAIL,
    payload,
  };
}

export function getUsers(payload) {
  return {
    type: GET_USERS,
    payload,
  };
}

export function getUsersSuccess(payload) {
  return {
    type: GET_USERS_SUCCESS,
    payload,
  };
}

export function getUsersFail(payload) {
  return {
    type: GET_USERS_FAIL,
    payload,
  };
}

export function getDocumentBarcode(payload) {
  return {
    type: GET_DOCUMENT_BARCODE,
    payload,
  };
}

export function getDocumentBarcodeSuccess(payload) {
  return {
    type: GET_DOCUMENT_BARCODE_SUCCESS,
    payload,
  };
}

export function getDocumentBarcodeFail(payload) {
  return {
    type: GET_DOCUMENT_BARCODE_FAIL,
    payload,
  };
}

export function getDocumentFields(payload) {
  return {
    type: GET_DOCUMENT_FIELS,
    payload,
  };
}

export function getDocumentFieldsSuccess(payload) {
  return {
    type: GET_DOCUMENT_FIELS_SUCCESS,
    payload,
  };
}

export function getDocumentFieldsFail(payload) {
  return {
    type: GET_DOCUMENT_FIELS_FAIL,
    payload,
  };
}
