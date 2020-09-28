import { takeLatest, call, put } from 'redux-saga/effects';

import {
	ADD_FIELDS_DOCUMENT,
} from './constants';

import {
	addFieldsDocumentSuccess,
	addFieldsDocumentFail,
} from './actions';

import {
	apiAddFieldsDocumentType,
} from '../../utils/routes';

function* addFieldsDocumentSaga(action) {
	try {
		const { success } = yield call(apiAddFieldsDocumentType, action.payload);
		yield put(addFieldsDocumentSuccess(success));
	} catch (e) {
		const data = e;
		yield put(addFieldsDocumentFail(data));
	}
}

// Individual exports for testing
export default function* documentTypeFieldsSaga() {
  yield takeLatest(ADD_FIELDS_DOCUMENT, addFieldsDocumentSaga);
}
