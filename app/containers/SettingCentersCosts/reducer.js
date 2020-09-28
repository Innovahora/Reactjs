/*
 *
 * SettingCentersCosts reducer
 *
 */

import { fromJS } from 'immutable';

import {
	GET_CENTERS_COST,
	GET_CENTERS_COST_SUCCESS,
	GET_CENTERS_COST_FAIL,
	ADD_CENTER_COST,
	ADD_CENTER_COST_SUCCESS,
	ADD_CENTER_COST_FAIL,
	DELETE_CENTER_COST,
	DELETE_CENTER_COST_SUCCESS,
	DELETE_CENTER_COST_FAIL,
} from './constants';

export const initialState = fromJS({
	isLoadingCentersCost: false,
    isLoadingDeleteCenterCost: false,
    isLoadingAddCenterCost: false,
	centersCost: [],
});

const settingCentersCostsReducer = (state = initialState, action) => {
	switch (action.type) {
      	case GET_CENTERS_COST:
        	return state.set('isLoadingCentersCost', true)
        		.set('centersCost', []);
        case GET_CENTERS_COST_SUCCESS:
        	return state.set('isLoadingCentersCost', false)
        		.set('centersCost', action.payload.items);
        case GET_CENTERS_COST_FAIL:
        	return state.set('isLoadingCentersCost', false);
        case ADD_CENTER_COST:
        	return state.set('isLoadingAddCenterCost', true);
		case ADD_CENTER_COST_SUCCESS:
			return state.set('isLoadingAddCenterCost', false);
		case ADD_CENTER_COST_FAIL:
			return state.set('isLoadingAddCenterCost', false);
		case DELETE_CENTER_COST:
			return state.set('isLoadingDeleteCenterCost', true);
		case DELETE_CENTER_COST_SUCCESS:
			return state.set('isLoadingDeleteCenterCost', false);
		case DELETE_CENTER_COST_FAIL:
			return state.set('isLoadingDeleteCenterCost', false);
        default:
        	return state;
    }
}

export default settingCentersCostsReducer;
