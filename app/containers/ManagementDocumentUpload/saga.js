import { takeLatest, call, put, select } from 'redux-saga/effects';
import { message } from 'antd';
import {
  GET_AREAS,
  GET_USERS,
  ADD_DOCUMENT,
  GET_DOCUMENT_FIELS,
  GET_DOCUMENT_TYPES,
  GET_DOCUMENT_BARCODE,
} from './constants';

import {
  getDocumentTypesSuccess,
  getDocumentTypesFail,
  getAreasSuccess,
  getAreasFail,
  addDocumentSuccess,
  addDocumentFail,
  getUsersSuccess,
  getUsersFail,
  getDocumentBarcodeSuccess,
  getDocumentBarcodeFail,
  getDocumentFieldsSuccess,
  getDocumentFieldsFail,
} from './actions';

import {
  apiGetAreas,
  apiGetUsers,
  apiAddDocument,
  apiGetDocumentTypes,
  apiGetDocumentBarcode,
  apiGetFieldsDocumentType,
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

function* getAreasSaga(action) {
  try {
    const { success, data } = yield call(apiGetAreas, action.payload);
    yield put(getAreasSuccess(data));
  } catch (e) {
    const data = e;
    yield put(getAreasFail(data));
  }
}

function* addDocumentSaga(action) {
  try {
    const { success } = yield call(apiAddDocument, action.payload);
    if (success) {
      message.success('Se agregó el archivo');
    } else {
      message.error('El código del documento no existe');
    }
    yield put(addDocumentSuccess(success));
  } catch (e) {
    const data = e;
    yield put(addDocumentFail(data));
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

function* getDocumentBarcodeSaga(action) {
  try {
    const { data } = yield call(apiGetDocumentBarcode, action.payload);
    yield put(getDocumentBarcodeSuccess(data.item));
  } catch (e) {
    const data = e;
    yield put(getDocumentBarcodeFail(data));
  }
}

function* getDocumentFieldsSaga(action) {
  try {
    const { data } = yield call(apiGetFieldsDocumentType, action.payload);
    yield put(getDocumentFieldsSuccess(data));
  } catch (e) {
    const data = e;
    yield put(getDocumentFieldsFail(data));
  }
}

export default function* managementDocumentUploadSaga() {
  yield takeLatest(GET_DOCUMENT_TYPES, getDocumentTypeSaga);
  yield takeLatest(GET_AREAS, getAreasSaga);
  yield takeLatest(ADD_DOCUMENT, addDocumentSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
  yield takeLatest(GET_DOCUMENT_FIELS, getDocumentFieldsSaga);
  yield takeLatest(GET_DOCUMENT_BARCODE, getDocumentBarcodeSaga);
}
