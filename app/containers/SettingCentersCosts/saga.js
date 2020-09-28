import { takeLatest, call, put } from 'redux-saga/effects';

import {
	ADD_CENTER_COST,
	GET_CENTERS_COST,
	DELETE_CENTER_COST,
} from './constants';

import {
	getCentersCostSuccess,
	getCentersCostFail,
	addCenterCostSuccess,
	addCenterCostFail,
	deleteCenterCostSuccess,
	deleteCenterCostFail,
} from './actions';

import {
	apiAddCentersCost,
	apiGetCentersCost,
	apiDeleteCentersCost,
} from '../../utils/routes';

function* getCentersCostSaga(action) {
	try {
		const { success, data } = yield call(apiGetCentersCost, action.payload);
		yield put(getCentersCostSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getCentersCostFail(data));
	}
}

function* addCenterCostSaga(action) {
	try {
		const { success, data } = yield call(apiAddCentersCost, action.payload);
		yield put(addCenterCostSuccess(data));
	} catch (e) {
		const data = e;
		yield put(addCenterCostFail(data));
	}
}

function* deleteCenterCostSaga(action) {
	try {
		const { success, data } = yield call(apiDeleteCentersCost, action.payload);
		yield put(deleteCenterCostSuccess(data));
	} catch (e) {
		const data = e;
		yield put(deleteCenterCostFail(data));
	}
}

export default function* settingCentersCostsSaga() {
	yield takeLatest(GET_CENTERS_COST, getCentersCostSaga);
	yield takeLatest(ADD_CENTER_COST, addCenterCostSaga);
	yield takeLatest(DELETE_CENTER_COST, deleteCenterCostSaga);
}
