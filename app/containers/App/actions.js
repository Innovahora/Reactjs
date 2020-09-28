import {
	CLOSE_SESION,
	CLOSE_SESION_SUCCESS,
	CLOSE_SESION_FAIL,
} from './constants';

export function closeSesion(payload) {
  return {
    type: CLOSE_SESION,
    payload,
  };
}

export function closeSesionSuccess(payload) {
  return {
    type: CLOSE_SESION_SUCCESS,
    payload,
  };
}

export function closeSesionFail(payload) {
  return {
    type: CLOSE_SESION_FAIL,
    payload,
  };
}
