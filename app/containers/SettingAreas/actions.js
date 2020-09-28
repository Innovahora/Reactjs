/*
 *
 * SettingAreas actions
 *
 */

import {
	GET_AREAS,
	GET_AREAS_SUCCESS,
	GET_AREAS_FAIL,
	ADD_AREA,
	ADD_AREA_SUCCESS,
	ADD_AREA_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from './constants';

export function getAreas(payload) {
  return {
    type: GET_AREAS,
    payload,
  };
}

export function getAreasSuccess(payload) {
  return {
    type: GET_AREAS_SUCCESS,
    payload,
  };
}

export function getAreasFail(payload) {
  return {
    type: GET_AREAS_FAIL,
    payload,
  };
}

export function addArea(payload) {
  return {
    type: ADD_AREA,
    payload,
  };
}

export function addAreaSuccess(payload) {
  return {
    type: ADD_AREA_SUCCESS,
    payload,
  };
}

export function addAreaFail(payload) {
  return {
    type: ADD_AREA_FAIL,
    payload,
  };
}

export function getUsers(payload) {
  return {
    type: GET_USERS,
    payload,
  };
}

export function getUsersSuccess(payload) {
  return {
    type: GET_USERS_SUCCESS,
    payload,
  };
}

export function getUsersFail(payload) {
  return {
    type: GET_USERS_FAIL,
    payload,
  };
}
