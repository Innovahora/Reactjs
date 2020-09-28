import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_DOCUMENT_TYPES,
	GET_DOCUMENT_BARCODES,
	ADD_DOCUMENT_BARCODE,
	DELETE_DOCUMENT_BARCODE,
} from './constants';

import {
	getDocumentBarcodesSuccess,
	getDocumentBarcodesFail,
	getDocumentTypesSuccess,
	getDocumentTypesFail,
	addDocumentBarcodeSuccess,
	addDocumentBarcodeFail,
	deleteDocumentBarcodeSuccess,
	deleteDocumentBarcodeFail,
} from './actions';

import {
	apiGetDocumentTypes,
	apiAddDocumentBarcode,
	apiGetDocumentBarcodes,
	apiDeleteDocumentBarcode,
} from '../../utils/routes';

function* getDocumentsSaga(action) {
	try {
		const { success, data } = yield call(apiGetDocumentBarcodes, action.payload);
		yield put(getDocumentBarcodesSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getDocumentBarcodesFail(data));
	}
}

function* getDocumentTypeSaga(action) {
	try {
		const { data } = yield call(apiGetDocumentTypes, action.payload);
		yield put(getDocumentTypesSuccess(data));
	} catch (e) {
		const data = e;
		yield put(getDocumentTypesFail(data));
	}
}

function* addDocumentBarcodeSaga(action) {
	try {
		const { data } = yield call(apiAddDocumentBarcode, action.payload);
		yield put(addDocumentBarcodeSuccess(data));
	} catch (e) {
		const data = e;
		yield put(addDocumentBarcodeFail(data));
	}
}

function* deleteDocumentBarcodeSaga(action) {
	try {
		const { data } = yield call(apiDeleteDocumentBarcode, action.payload);
		yield put(deleteDocumentBarcodeSuccess(data));
	} catch (e) {
		const data = e;
		yield put(deleteDocumentBarcodeFail(data));
	}
}

export default function* managementDocumentScanSaga() {
	yield takeLatest(GET_DOCUMENT_BARCODES, getDocumentsSaga);
	yield takeLatest(GET_DOCUMENT_TYPES, getDocumentTypeSaga);
	yield takeLatest(ADD_DOCUMENT_BARCODE, addDocumentBarcodeSaga);
	yield takeLatest(DELETE_DOCUMENT_BARCODE, deleteDocumentBarcodeSaga);
}
