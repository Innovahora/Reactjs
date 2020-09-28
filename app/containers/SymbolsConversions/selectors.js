import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the symbolsConversions state domain
 */

const selectSymbolsConversionsDomain = state =>
  state.symbolsConversions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SymbolsConversions
 */

export const makeSelectIsLoadingUpdateSettings = () =>
  createSelector(
    selectSymbolsConversionsDomain,
    state => state.get('isLoadingUpdateSettings'),
  );

export { selectSymbolsConversionsDomain };
