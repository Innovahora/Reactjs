/**
 *
 * Asynchronously loads the component for TreasuryFinance
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
