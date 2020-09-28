import axios from 'axios';
import { TYPE_FETCHING, CODE_FETCHING, BASE_URL } from './constants';
import { LOCAL_TOKEN, clearStorage } from './storage';

async function returnFuntionAsync(callback = null) {
  if (callback !== null) {
    try {
      return returnFunction(await callback());
    } catch (error) {
      return error;
    }
  }

  return null;
}

function returnFunction(callback, all = false) {
  if (all) {
    return callback
      .then(response => {
        if (response.status === CODE_FETCHING.error.Unauthorized) {
          clearStorage();
          return false;
        }
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  return callback
    .then(response => {
      if (response.status === CODE_FETCHING.error.Unauthorized) {
        clearStorage();
        return false;
      }
      return response.data;
    })
    .catch(error => {
      if (error.response.status === CODE_FETCHING.error.Unauthorized) {
        clearStorage();
      }
      throw error;
    });
}

const api = (
  url = '',
  method = TYPE_FETCHING.get,
  params = {},
  asyncr = false,
  file = false,
) => {
  const options = {
    method,
    url:  `${BASE_URL}/${url}`,
    headers: {
      Authorization: `Bearer ${LOCAL_TOKEN}`,
      'Accept': 'application/json',
      'cache-control': 'no-cache',
    }
  };

  switch (method) {
    case TYPE_FETCHING.post:
      options.data = params;

      if (file) {
        options.headers['content-type'] = 'multipart/form-data';
        options.data = params.file;
      }

      break;
    default:
      options.params = params;
  }

  if (asyncr) {
    return returnFuntionAsync(axios.request(options));
  }

  return returnFunction(axios.request(options));
};

export default api;
