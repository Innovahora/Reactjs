/*
 *
 * ManagementDocumentScan actions
 *
 */

import {
	GET_DOCUMENT_BARCODES,
	GET_DOCUMENT_BARCODES_SUCCESS,
	GET_DOCUMENT_BARCODES_FAIL,
	GET_DOCUMENT_TYPES,
	GET_DOCUMENT_TYPES_SUCCESS,
	GET_DOCUMENT_TYPES_FAIL,
  ADD_DOCUMENT_BARCODE,
  ADD_DOCUMENT_BARCODE_SUCCESS,
  ADD_DOCUMENT_BARCODE_FAIL,
  DELETE_DOCUMENT_BARCODE,
  DELETE_DOCUMENT_BARCODE_SUCCESS,
  DELETE_DOCUMENT_BARCODE_FAIL,
} from './constants';

export function getDocumentBarcodes(payload) {
  return {
    type: GET_DOCUMENT_BARCODES,
    payload,
  };
}

export function getDocumentBarcodesSuccess(payload) {
  return {
    type: GET_DOCUMENT_BARCODES_SUCCESS,
    payload,
  };
}

export function getDocumentBarcodesFail(payload) {
  return {
    type: GET_DOCUMENT_BARCODES_FAIL,
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

export function addDocumentBarcode(payload) {
  return {
  type: ADD_DOCUMENT_BARCODE,
  payload,
  };
}

export function addDocumentBarcodeSuccess(payload) {
  return {
  type: ADD_DOCUMENT_BARCODE_SUCCESS,
  payload,
  };
}

export function addDocumentBarcodeFail(payload) {
  return {
  type: ADD_DOCUMENT_BARCODE_FAIL,
  payload,
  };
}

export function deleteDocumentBarcode(payload) {
  return {
  type: DELETE_DOCUMENT_BARCODE,
  payload,
  };
}

export function deleteDocumentBarcodeSuccess(payload) {
  return {
  type: DELETE_DOCUMENT_BARCODE_SUCCESS,
  payload,
  };
}

export function deleteDocumentBarcodeFail(payload) {
  return {
  type: DELETE_DOCUMENT_BARCODE_FAIL,
  payload,
  };
}
