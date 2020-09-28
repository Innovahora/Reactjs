/*
 *
 * SettingAreas reducer
 *
 */
import { fromJS } from 'immutable';

import {
	GET_AREAS,
	GET_AREAS_SUCCESS,
	GET_AREAS_FAIL,
	ADD_AREA,
	ADD_AREA_SUCCESS,
	ADD_AREA_FAIL,
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
} from './constants';

export const initialState = fromJS({
	isLoadingAreas: false,
	isLoadingAddArea: false,
	areas: [],
	isLoadingUsers: false,
	users: [],
});

const settingAreasReducer = (state = initialState, action) => {
	switch (action.type) {
	  	case GET_AREAS:
	    	return state.set('isLoadingAreas', true)
	    		.set('areas', []);
	    case GET_AREAS_SUCCESS:
	    	return state.set('isLoadingAreas', false)
	    		.set('areas', action.payload.items);
	    case GET_AREAS_FAIL:
	    	return state.set('isLoadingAreas', false);
	    case ADD_AREA:
	    	return state.set('isLoadingAddArea', true);
		case ADD_AREA_SUCCESS:
			return state.set('isLoadingAddArea', false);
		case ADD_AREA_FAIL:
			return state.set('isLoadingAddArea', false);
		case GET_USERS:
		  	return state.set('isLoadingUsers', true)
		  		.set('users', []);
		case GET_USERS_SUCCESS:
		  	return state
		    	.set('isLoadingUsers', false)
		    	.set('users', action.payload.items);
		case GET_USERS_FAIL:
		  	return state.set('isLoadingUsers', false);
	    default:
	    	return state;
	}
};

export default settingAreasReducer;
