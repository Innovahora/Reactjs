/*
 *
 * SettingCreateUser reducer
 *
 */
import { fromJS } from 'immutable';

import {
	ADD_USER,
	ADD_USER_SUCCESS,
	ADD_USER_FAIL,
	GET_PROFILES,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAIL,
    GET_AREAS,
    GET_AREAS_SUCCESS,
    GET_AREAS_FAIL,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
} from './constants';

export const initialState = fromJS({
	isLoadingAddUser: false,
	isLoadingProfiles: false,
	profiles: [],
    isLoadingAreas: false,
    areas: [],
    isLoadingUser: false,
    user: null,
});

const settingCreateUserReducer = (state = initialState, action) => {
    switch (action.type) {
      	case ADD_USER:
        	return state.set('isLoadingAddUser', true);
        case ADD_USER_SUCCESS:
        	return state.set('isLoadingAddUser', false);
        case ADD_USER_FAIL:
        	return state.set('isLoadingAddUser', false);
       	case GET_PROFILES:
        	return state.set('isLoadingProfiles', true)
        		.set('profiles', []);
        case GET_PROFILES_SUCCESS:
        	return state.set('isLoadingProfiles', false)
        		.set('profiles', action.payload.items);
        case GET_PROFILES_FAIL:
        	return state.set('isLoadingProfiles', false);
        case GET_AREAS:
            return state.set('isLoadingAreas', true)
                .set('areas', []);
        case GET_AREAS_SUCCESS:
            return state.set('isLoadingAreas', false)
                .set('areas', action.payload.items);
        case GET_AREAS_FAIL:
            return state.set('isLoadingAreas', false);
        case GET_USER:
            return state.set('isLoadingUser', true)
                .set('user', null);
        case GET_USER_SUCCESS:
            return state.set('isLoadingUser', false)
                .set('user', action.payload);
        case GET_USER_FAIL:
            return state.set('isLoadingUser', false);
        default:
        	return state;
    }
};

export default settingCreateUserReducer;
