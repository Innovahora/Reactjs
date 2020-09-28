/*
 *
 * SettingProfiles actions
 *
 */

import {
	GET_PROFILES,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAIL,
  ADD_PROFILE,
  ADD_PROFILE_SUCCESS,
  ADD_PROFILE_FAIL,
  DELETE_PROFILE,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  GET_MODULES,
  GET_MODULES_SUCCESS,
  GET_MODULES_FAIL,
} from './constants';

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

export function addProfile(payload) {
  return {
    type: ADD_PROFILE,
    payload,
  };
}

export function addProfileSuccess(payload) {
  return {
    type: ADD_PROFILE_SUCCESS,
    payload,
  };
}

export function addProfileFail(payload) {
  return {
    type: ADD_PROFILE_FAIL,
    payload,
  };
}

export function deleteProfile(payload) {
  return {
    type: DELETE_PROFILE,
    payload,
  };
}

export function deleteProfileSuccess(payload) {
  return {
    type: DELETE_PROFILE_SUCCESS,
    payload,
  };
}

export function deleteProfileFail(payload) {
  return {
    type: DELETE_PROFILE_FAIL,
    payload,
  };
}

export function getModules(payload) {
  return {
    type: GET_MODULES,
    payload,
  };
}

export function getModulesSuccess(payload) {
  return {
    type: GET_MODULES_SUCCESS,
    payload,
  };
}

export function getModulesFail(payload) {
  return {
    type: GET_MODULES_FAIL,
    payload,
  };
}
