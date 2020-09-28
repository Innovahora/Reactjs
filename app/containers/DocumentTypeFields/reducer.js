/*
 *
 * DocumentTypeFields reducer
 *
 */
import { fromJS } from 'immutable';

import {
	ADD_FIELDS_DOCUMENT,
	ADD_FIELDS_DOCUMENT_SUCCESS,
	ADD_FIELDS_DOCUMENT_FAIL,
} from './constants';

export const initialState = fromJS({
	isLoadingAddFields: false,
});

const documentTypeFieldsReducer = (state = initialState, action) => {
    switch (action.type) {
      	case ADD_FIELDS_DOCUMENT:
        	return state.set('isLoadingAddFields', true);
        case ADD_FIELDS_DOCUMENT_SUCCESS:
        	return state.set('isLoadingAddFields', false);
        case ADD_FIELDS_DOCUMENT_FAIL:
        	return state.set('isLoadingAddFields', false);
       	default:
       		return state;
    }
};

export default documentTypeFieldsReducer;
