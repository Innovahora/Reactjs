/*
 *
 * ManagementDocumentList reducer
 *
 */
import { fromJS } from 'immutable';

import {
	GET_DOCUMENTS,
	GET_DOCUMENTS_SUCCESS,
	GET_DOCUMENTS_FAIL,
	GET_DOCUMENT_TYPES,
	GET_DOCUMENT_TYPES_SUCCESS,
	GET_DOCUMENT_TYPES_FAIL,
} from './constants';

export const initialState = fromJS({
	isLoadingDocuments: false,
	isLoadingDocumentTypes: false,
	documentTypes: [],
	documents: [],
});

/* eslint-disable default-case, no-param-reassign */
const managementDocumentListReducer = (state = initialState, action) => {
    switch (action.type) {
      	case GET_DOCUMENTS:
      		return state.set('isLoadingDocuments', true)
      			.set('documents', []);
		case GET_DOCUMENTS_SUCCESS:
			return state.set('isLoadingDocuments', false)
      			.set('documents', action.payload.items);
		case GET_DOCUMENTS_FAIL:
			return state.set('isLoadingDocuments', false);
		case GET_DOCUMENT_TYPES:
			return state.set('isLoadingDocumentTypes', true)
				.set('documentTypes', []);
		case GET_DOCUMENT_TYPES_SUCCESS:
			return state.set('isLoadingDocumentTypes', false)
				.set('documentTypes', action.payload.items);
		case GET_DOCUMENT_TYPES_FAIL:
			return state.set('isLoadingDocumentTypes', false);
        default:
        	return state;
    }
};

export default managementDocumentListReducer;
