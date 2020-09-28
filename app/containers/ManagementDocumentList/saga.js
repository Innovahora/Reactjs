import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_DOCUMENTS,
	GET_DOCUMENT_TYPES,
} from './constants';

import {
	getDocumentsSuccess,
	getDocumentsFail,
	getDocumentTypesSuccess,
	getDocumentTypesFail,
} from './actions';

import {
	apiGetDocuments,
	apiGetDocumentTypes,
} from '../../utils/routes';

function* getDocumentsSaga(action) {
	try {
		const { success, data } = yield call(apiGetDocuments, action.payload);
		yield put(getDocumentsSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getDocumentsFail(data));
	}
}

function* getDocumentTypesSaga(action) {
	try {
		const { success, data } = yield call(apiGetDocumentTypes, action.payload);
		yield put(getDocumentTypesSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getDocumentTypesFail(data));
	}
}

// Individual exports for testing
export default function* managementDocumentListSaga() {
  yield takeLatest(GET_DOCUMENTS, getDocumentsSaga);
  yield takeLatest(GET_DOCUMENT_TYPES, getDocumentTypesSaga);
}
