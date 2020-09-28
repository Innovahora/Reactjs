/*
 *
 * DocumentTypeFields actions
 *
 */

import {
	ADD_FIELDS_DOCUMENT,
	ADD_FIELDS_DOCUMENT_SUCCESS,
	ADD_FIELDS_DOCUMENT_FAIL,
} from './constants';

export function addFieldsDocument(payload) {
  return {
    type: ADD_FIELDS_DOCUMENT,
    payload,
  };
}

export function addFieldsDocumentSuccess(payload) {
  return {
    type: ADD_FIELDS_DOCUMENT_SUCCESS,
    payload,
  };
}

export function addFieldsDocumentFail(payload) {
  return {
    type: ADD_FIELDS_DOCUMENT_FAIL,
    payload,
  };
}
