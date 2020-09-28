/*
 *
 * SettingCentersCosts actions
 *
 */

import {
	GET_CENTERS_COST,
	GET_CENTERS_COST_SUCCESS,
	GET_CENTERS_COST_FAIL,
	ADD_CENTER_COST,
	ADD_CENTER_COST_SUCCESS,
	ADD_CENTER_COST_FAIL,
	DELETE_CENTER_COST,
	DELETE_CENTER_COST_SUCCESS,
	DELETE_CENTER_COST_FAIL,
} from './constants';

export function getCentersCost(payload) {
  return {
    type: GET_CENTERS_COST,
    payload,
  };
}

export function getCentersCostSuccess(payload) {
  return {
    type: GET_CENTERS_COST_SUCCESS,
    payload,
  };
}

export function getCentersCostFail(payload) {
  return {
    type: GET_CENTERS_COST_FAIL,
    payload,
  };
}

export function addCenterCost(payload) {
  return {
    type: ADD_CENTER_COST,
    payload,
  };
}

export function addCenterCostSuccess(payload) {
  return {
    type: ADD_CENTER_COST_SUCCESS,
    payload,
  };
}

export function addCenterCostFail(payload) {
  return {
    type: ADD_CENTER_COST_FAIL,
    payload,
  };
}

export function deleteCenterCost(payload) {
  return {
    type: DELETE_CENTER_COST,
    payload,
  };
}

export function deleteCenterCostSuccess(payload) {
  return {
    type: DELETE_CENTER_COST_SUCCESS,
    payload,
  };
}

export function deleteCenterCostFail(payload) {
  return {
    type: DELETE_CENTER_COST_FAIL,
    payload,
  };
}
