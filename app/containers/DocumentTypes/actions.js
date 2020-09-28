/*
 *
 * DocumentTypes actions
 *
 */

import {
	GET_DOCUMENT_TYPES,
	GET_DOCUMENT_TYPES_SUCCESS,
	GET_DOCUMENT_TYPES_FAIL,
	ADD_DOCUMENT_TYPE,
	ADD_DOCUMENT_TYPE_SUCCESS,
	ADD_DOCUMENT_TYPE_FAIL,
	DELETE_DOCUMENT_TYPE,
	DELETE_DOCUMENT_TYPE_SUCCESS,
	DELETE_DOCUMENT_TYPE_FAIL,
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

export function addDocumentType(payload) {
  return {
	type: ADD_DOCUMENT_TYPE,
	payload,
  };
}

export function addDocumentTypeSuccess(payload) {
  return {
	type: ADD_DOCUMENT_TYPE_SUCCESS,
	payload,
  };
}

export function addDocumentTypeFail(payload) {
  return {
	type: ADD_DOCUMENT_TYPE_FAIL,
	payload,
  };
}

export function deleteDocumentType(payload) {
  return {
	type: DELETE_DOCUMENT_TYPE,
	payload,
  };
}

export function deleteDocumentTypeSuccess(payload) {
  return {
	type: DELETE_DOCUMENT_TYPE_SUCCESS,
	payload,
  };
}

export function deleteDocumentTypeFail(payload) {
  return {
	type: DELETE_DOCUMENT_TYPE_FAIL,
	payload,
  };
}
