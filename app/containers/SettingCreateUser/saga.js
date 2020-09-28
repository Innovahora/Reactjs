import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_USER,
	ADD_USER,
	GET_PROFILES,
	GET_AREAS,
} from './constants';

import {
	getProfilesSuccess,
	getProfilesFail,
	addUserSuccess,
	addUserFail,
	getAreasSuccess,
	getAreasFail,
	getUserSuccess,
	getUserFail,
} from './actions';

import {
	apiGetUser,
	apiAddUser,
	apiGetAreas,
	apiGetProfiles,
} from '../../utils/routes';

function* getProfilesSaga(action) {
	try {
		const { success, data } = yield call(apiGetProfiles, action.payload);
		yield put(getProfilesSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getProfilesFail(data));
	}
}

function* addUserSaga(action) {
	try {
		const { success, data } = yield call(apiAddUser, action.payload);
		yield put(addUserSuccess(data));
	} catch (e) {
		const data = e;
		yield put(addUserFail(data));
	}
}

function* getAreasSaga(action) {
	try {
		const { success, data } = yield call(apiGetAreas, action.payload);
		yield put(getAreasSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getAreasFail(data));
	}
}

function* getUserSaga(action) {
	try {
		const { data } = yield call(apiGetUser, action.payload);
		yield put(getUserSuccess(data.item));
	} catch (e) {
		const data = e;
		yield put(getUserFail(data));
	}
}

export default function* settingCreateUserSaga() {
  yield takeLatest(GET_PROFILES, getProfilesSaga);
  yield takeLatest(ADD_USER, addUserSaga);
  yield takeLatest(GET_AREAS, getAreasSaga);
  yield takeLatest(GET_USER, getUserSaga);
}
