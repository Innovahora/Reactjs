//  export const BASE_URL = 'http://localhost:8888/afp/erp-backend/public';
export const BASE_URL = 'http://ec2-54-144-239-142.compute-1.amazonaws.com/erp-backend/public';
//  export const BASE_URL =
//  'http://ec2-54-144-239-142.compute-1.amazonaws.com/backend-laravel/public';
//  'http://ec2-54-144-239-142.compute-1.amazonaws.com/erp-backend/public';
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const KEY_USER = 'user_data';
export const KEY_TOKEN = 'token';
export const FEE_RECEIPT = 11;
export const LIMIT_PAGE = 4;
export const TYPE_FETCHING = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
};
export const TYPE_REGISTER = {
  record: 1,
  aim: 2,
};
export const CODE_FETCHING = {
  success: {
    ok: 200,
    created: 201,
    accepted: 202,
  },
  error: {
    unknownUrl: 404,
    denieded: 429,
    Unauthorized: 401,
  },
};

export const FILTERS_RANGE = [
  'Mes actual',
  'Últimos 30 días',
  'Últimos 3 meses',
  'Últimos 6 meses',
  'Últimos 12 meses',
];
