import {
  isNumber
} from './util';

import checkEnv from './environment';
import checkQueryString from './query';

import { googleReverseGeocode } from './geocoder';

const INTERNAL_CONFIG_ERROR = 'Configuration error';
const INVALID_COORDS_PARAMETERS = 'Invalid coordinates';

/**
 * return a bad request (HTTP 400) response withe the given mmessage
 * @param  {String}   message  error message
 * @param  {Function} callback [description]
 */
const badRequest = (message, callback) => {
  console.warn('bad request:', message);
  callback(null, {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: {
      error: 400,
      message: JSON.stringify(message),
    }
  });
};

/**
 * return function result
 * @param  {Object}   data     where is result as an JSON
 * @param  {Function} callback [description]
 */
const success = (data, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(data)
  });
};

/**
 * [operationGoogle description]
 * @param  {Number}   lat      [description]
 * @param  {Number}   lng      [description]
 * @param  {Function} callback [description]
 */
const operationGoogle = (lat, lng, callback) => {
  if (!isNumber(lat) || !isNumber(lng)) {
    badRequest(INVALID_COORDS_PARAMETERS, callback);
  }
  const p = googleReverseGeocode(lat, lng);
  p.then((response) => {
    success(response, callback);
  }).catch((err) => {
    badRequest(err, callback);
  });
};
/**
 * function handler
 * @param  {Object}   event    [description]
 * @param  {Object}   context  [description]
 * @param  {Function} callback [description]
 */
const handler = (event, context, callback) => {
  if (checkEnv(process.env).length > 0) {
    badRequest(INTERNAL_CONFIG_ERROR, callback);
    return;
  }
  // check queryStringParameters
  const command = checkQueryString(event.queryStringParameters);
  if (command.error) {
    badRequest(command.error, callback);
    return;
  }
  if (command.operation === 'google') {
    operationGoogle(command.lat, command.lng, callback);
  }
};

export default handler;
