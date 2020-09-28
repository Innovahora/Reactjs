import { takeLatest, call, put } from 'redux-saga/effects';

import { message } from 'antd';

import { LOGIN_USER } from './constants';

import { loginUserSuccess, loginUserFail } from './actions';

import { apiLoginUser } from '../../utils/routes';

import { KEY_ID_USER, KEY_TOKEN, setItem } from '../../utils/storage';

function* loginUserSagas(action) {
  try {
    const { success, data } = yield call(apiLoginUser, action.payload);
    if (success) {
      message.success(data.message);
      setItem(KEY_ID_USER, data.user.id);
      setItem(KEY_TOKEN, data.token);
      yield put(loginUserSuccess(success));
      window.location.href = '/dashboard';
    } else {
      message.error(data.message);
      yield put(loginUserFail(success));
    }
  } catch (e) {
    const data = e;
    yield put(loginUserFail(data));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_USER, loginUserSagas);
}
