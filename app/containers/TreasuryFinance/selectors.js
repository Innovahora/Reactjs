import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the treasuryFinance state domain
 */

const selectTreasuryFinanceDomain = state =>
  state.treasuryFinance || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TreasuryFinance
 */

const makeSelectTreasuryFinance = () =>
  createSelector(
    selectTreasuryFinanceDomain,
    substate => substate,
  );

export default makeSelectTreasuryFinance;
export { selectTreasuryFinanceDomain };
