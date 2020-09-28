import { takeLatest, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import { UPDATE_SETTINGS } from './constants';

import { updateSettingsSuccess, updateSettingsFail } from './actions';

import { apiUpdateSettings } from '../../utils/routes';

function* updateSettingsSaga(action) {
  try {
    const { success } = yield call(apiUpdateSettings, action.payload);
    message.success('Se actualizaron sus datos exitosamente');
    yield put(updateSettingsSuccess(success));
  } catch (e) {
    const data = e;
    yield put(updateSettingsFail(data));
  }
}

export default function* symbolsConversionsSaga() {
  yield takeLatest(UPDATE_SETTINGS, updateSettingsSaga);
}
