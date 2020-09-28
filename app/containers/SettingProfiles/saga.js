import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_MODULES,
	ADD_PROFILE,
	GET_PROFILES,
	DELETE_PROFILE,
} from './constants';

import {
	getProfilesSuccess,
	getProfilesFail,
	addProfileSuccess,
	addProfileFail,
	deleteProfileSuccess,
	deleteProfileFail,
	getModulesSuccess,
	getModulesFail,
} from './actions';

import {
	apiGetModules,
	apiAddProfile,
	apiGetProfiles,
	apiDeleteProfile,
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

function* addProfileSaga(action) {
	try {
		const { success, data } = yield call(apiAddProfile, action.payload);
		yield put(addProfileSuccess(data));
	} catch (e) {
		const data = e;
		yield put(addProfileFail(data));
	}
}

function* deleteProfileSaga(action) {
	try {
		const { success, data } = yield call(apiDeleteProfile, action.payload);
		yield put(deleteProfileSuccess(data));
	} catch (e) {
		const data = e;
		yield put(deleteProfileFail(data));
	}
}

function* getModulesSaga(action) {
	try {
		const { success, data } = yield call(apiGetModules, action.payload);
		yield put(getModulesSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getModulesFail(data));
	}
}

export default function* settingProfilesSaga() {
	yield takeLatest(ADD_PROFILE, addProfileSaga);
	yield takeLatest(GET_MODULES, getModulesSaga);
	yield takeLatest(GET_PROFILES, getProfilesSaga);
	yield takeLatest(DELETE_PROFILE, deleteProfileSaga);
}
