/*
 *
 * ManagementDocumentScan reducer
 *
 */
import { fromJS } from 'immutable';

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

export const initialState = fromJS({
	isLoadingDeleteDocumentBarcode: false,
	isLoadingAddDocumentBarcode: false,
	isLoadingDocumentTypes: false,
	isLoadingDocuments: false,
	documentBarcode: null,
	documentTypes: [],
	documents: [],
});

const managementDocumentScanReducer = (state = initialState, action) => {
    switch (action.type) {
      	case GET_DOCUMENT_BARCODES:
      		return state.set('isLoadingDocuments', true)
      			.set('documents', []);
      	case GET_DOCUMENT_BARCODES_SUCCESS:
      		return state.set('isLoadingDocuments', false)
      			.set('documents', action.payload.items);
      	case GET_DOCUMENT_BARCODES_FAIL:
      		return state.set('isLoadingDocuments', false);
      	case GET_DOCUMENT_TYPES:
      		return state.set('isLoadingDocumentTypes', true)
      			.set('documentTypes', []);
		case GET_DOCUMENT_TYPES_SUCCESS:
			return state.set('isLoadingDocumentTypes', false)
				.set('documentTypes', action.payload.items);
		case GET_DOCUMENT_TYPES_FAIL:
			return state.set('isLoadingDocumentTypes', false);
		case ADD_DOCUMENT_BARCODE:
			return state.set('isLoadingAddDocumentBarcode', true)
				.set('documentBarcode', null);
		case ADD_DOCUMENT_BARCODE_SUCCESS:
			return state.set('isLoadingAddDocumentBarcode', false)
				.set('documentBarcode', action.payload);
		case ADD_DOCUMENT_BARCODE_FAIL:
			return state.set('isLoadingAddDocumentBarcode', false);
		case DELETE_DOCUMENT_BARCODE:
			return state.set('isLoadingDeleteDocumentBarcode', true);
		case DELETE_DOCUMENT_BARCODE_SUCCESS:
			return state.set('isLoadingDeleteDocumentBarcode', false);
		case DELETE_DOCUMENT_BARCODE_FAIL:
			return state.set('isLoadingDeleteDocumentBarcode', false);
      	default:
      		return state;
    }
};

export default managementDocumentScanReducer;
