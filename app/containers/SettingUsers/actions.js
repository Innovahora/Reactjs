/*
 *
 * SettingUsers actions
 *
 */

import {
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_PROFILES,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  GET_AREAS,
  GET_AREAS_SUCCESS,
  GET_AREAS_FAIL,
} from './constants';

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

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export function addUserSuccess(payload) {
  return {
    type: ADD_USER_SUCCESS,
    payload,
  };
}

export function addUserFail(payload) {
  return {
    type: ADD_USER_FAIL,
    payload,
  };
}

export function getProfiles(payload) {
  return {
    type: GET_PROFILES,
    payload,
  };
}

export function getProfilesSuccess(payload) {
  return {
    type: GET_PROFILES_SUCCESS,
    payload,
  };
}

export function getProfilesFail(payload) {
  return {
    type: GET_PROFILES_FAIL,
    payload,
  };
}

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

export function getUser(payload) {
  return {
    type: GET_USER,
    payload,
  };
}

export function getUserSuccess(payload) {
  return {
    type: GET_USER_SUCCESS,
    payload,
  };
}

export function getUserFail(payload) {
  return {
    type: GET_USER_FAIL,
    payload,
  };
}
