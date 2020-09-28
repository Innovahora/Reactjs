/*
 *
 * SettingProfiles reducer
 *
 */
import { fromJS } from 'immutable';

import {
	GET_PROFILES,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAIL,
    ADD_PROFILE,
    ADD_PROFILE_SUCCESS,
    ADD_PROFILE_FAIL,
    DELETE_PROFILE,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    GET_MODULES,
    GET_MODULES_SUCCESS,
    GET_MODULES_FAIL,
} from './constants';

export const initialState = fromJS({
	isLoadingProfiles: false,
    isLoadingAddProfile: false,
    isLoadingDeleteProfile: false,
    isLoadingModules: false,
	profiles: [],
    modules: [],
});

const settingProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
      	case GET_PROFILES:
        	return state.set('isLoadingProfiles', true)
        		.set('profiles', []);
        case GET_PROFILES_SUCCESS:
        	return state.set('isLoadingProfiles', false)
        		.set('profiles', action.payload.items);
        case GET_PROFILES_FAIL:
        	return state.set('isLoadingProfiles', false);
        case ADD_PROFILE:
            return state.set('isLoadingAddProfile', true);
        case ADD_PROFILE_SUCCESS:
            return state.set('isLoadingAddProfile', false);
        case ADD_PROFILE_FAIL:
            return state.set('isLoadingAddProfile', false);
        case DELETE_PROFILE:
            return state.set('isLoadingDeleteProfile', true);
        case DELETE_PROFILE_SUCCESS:
            return state.set('isLoadingDeleteProfile', false);
        case DELETE_PROFILE_FAIL:
            return state.set('isLoadingDeleteProfile', false);
        case GET_MODULES:
            return state.set('isLoadingModules', true)
                .set('modules', []);
        case GET_MODULES_SUCCESS:
            return state.set('isLoadingModules', false)
                .set('modules', action.payload.items);
        case GET_MODULES_FAIL:
            return state.set('isLoadingModules', false);
        default:
        	return state;
    }
};

export default settingProfilesReducer;
