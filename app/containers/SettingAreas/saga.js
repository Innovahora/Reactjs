import { takeLatest, call, put } from 'redux-saga/effects';

import {
	ADD_AREA,
	GET_AREAS,
	GET_USERS,
} from './constants';

import {
	getAreasSuccess,
	getAreasFail,
	addAreaSuccess,
	addAreaFail,
	getUsersSuccess,
	getUsersFail,
} from './actions';

import {
	apiAddArea,
	apiGetAreas,
	apiGetUsers,
} from '../../utils/routes';

function* getAreasSaga(action) {
	try {
		const { success, data } = yield call(apiGetAreas, action.payload);
		yield put(getAreasSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getAreasFail(data));
	}
}

function* addAreaSaga(action) {
	try {
		const { success } = yield call(apiAddArea, action.payload);
		yield put(addAreaSuccess(success));
	} catch (e) {
		const data = e;
		yield put(addAreaFail(data));
	}
}

function* getUsersSaga(action) {
  try {
    const { data } = yield call(apiGetUsers, action.payload);
    yield put(getUsersSuccess(data));
  } catch (e) {
    const data = e;
    yield put(getUsersFail(data));
  }
}

export default function* settingAreasSaga() {
	yield takeLatest(GET_AREAS, getAreasSaga);
	yield takeLatest(ADD_AREA, addAreaSaga);
	yield takeLatest(GET_USERS, getUsersSaga);
}
