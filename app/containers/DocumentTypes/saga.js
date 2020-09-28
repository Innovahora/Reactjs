import { takeLatest, call, put } from 'redux-saga/effects';

import {
	ADD_DOCUMENT_TYPE,
	GET_DOCUMENT_TYPES,
	DELETE_DOCUMENT_TYPE,
} from './constants';

import {
	getDocumentTypesSuccess,
	getDocumentTypesFail,
	addDocumentTypeSuccess,
	addDocumentTypeFail,
	deleteDocumentTypeSuccess,
	deleteDocumentTypeFail,
} from './actions';

import {
	apiAddDocumentType,
	apiGetDocumentTypes,
	apiDeleteDocumentType,
} from '../../utils/routes';

function* getDocumentTypeSaga(action) {
	try {
		const { data } = yield call(apiGetDocumentTypes, action.payload);
		yield put(getDocumentTypesSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getDocumentTypesFail(data));
	}
}

function* addDocumentTypeSaga(action) {
	try {
		const { success } = yield call(apiAddDocumentType, action.payload);
		yield put(addDocumentTypeSuccess(success));
	} catch (e) {
		const data = e;
		yield put(addDocumentTypeFail(data));
	}
}

function* deleteDocumentTypeSaga(action) {
	try {
		const { success } = yield call(apiDeleteDocumentType, action.payload);
		yield put(deleteDocumentTypeSuccess(success));
	} catch (e) {
		const data = e;
		yield put(deleteDocumentTypeFail(data));
	}
}

export default function* documentTypesSaga() {
	yield takeLatest(ADD_DOCUMENT_TYPE, addDocumentTypeSaga);
	yield takeLatest(DELETE_DOCUMENT_TYPE, deleteDocumentTypeSaga);
	yield takeLatest(GET_DOCUMENT_TYPES, getDocumentTypeSaga);
}
