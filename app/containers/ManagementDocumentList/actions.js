/*
 *
 * ManagementDocumentList actions
 *
 */

import {
	GET_DOCUMENTS,
	GET_DOCUMENTS_SUCCESS,
	GET_DOCUMENTS_FAIL,
  GET_DOCUMENT_TYPES,
  GET_DOCUMENT_TYPES_SUCCESS,
  GET_DOCUMENT_TYPES_FAIL,
} from './constants';

export function getDocuments(payload) {
  return {
    type: GET_DOCUMENTS,
    payload,
  };
}

export function getDocumentsSuccess(payload) {
  return {
    type: GET_DOCUMENTS_SUCCESS,
    payload,
  };
}

export function getDocumentsFail(payload) {
  return {
    type: GET_DOCUMENTS_FAIL,
    payload,
  };
}

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
