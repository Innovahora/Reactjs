/*
 *
 * DocumentTypes reducer
 *
 */
import { fromJS } from 'immutable';

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

export const initialState = fromJS({
	isLoadingDocumentTypes: false,
	isLoadingAddDocumentType: false,
	isLoadingDeleteDocumentType: false,
	documentTypes: [],
});

const documentTypesReducer = (state = initialState, action) => {
    switch (action.type) {
      	case GET_DOCUMENT_TYPES:
      		return state.set('isLoadingDocumentTypes', true)
      			.set('documentTypes', []);
		case GET_DOCUMENT_TYPES_SUCCESS:
			return state.set('isLoadingDocumentTypes', false)
				.set('documentTypes', action.payload.items);
		case GET_DOCUMENT_TYPES_FAIL:
			return state.set('isLoadingDocumentTypes', false);
		case ADD_DOCUMENT_TYPE:
			return state.set('isLoadingAddDocumentType', true);
		case ADD_DOCUMENT_TYPE_SUCCESS:
			return state.set('isLoadingAddDocumentType', false);
		case ADD_DOCUMENT_TYPE_FAIL:
			return state.set('isLoadingAddDocumentType', false);
		case DELETE_DOCUMENT_TYPE:
			return state.set('isLoadingDeleteDocumentType', true);
		case DELETE_DOCUMENT_TYPE_SUCCESS:
			return state.set('isLoadingDeleteDocumentType', false);
		case DELETE_DOCUMENT_TYPE_FAIL:
			return state.set('isLoadingDeleteDocumentType', false);
        default:
        	return state;
    }
};

export default documentTypesReducer;
