import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managementTemplates state domain
 */

const selectManagementTemplatesDomain = state =>
  state.managementTemplates || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagementTemplates
 */

const makeSelectManagementTemplates = () =>
  createSelector(
    selectManagementTemplatesDomain,
    substate => substate,
  );

export default makeSelectManagementTemplates;
export { selectManagementTemplatesDomain };
