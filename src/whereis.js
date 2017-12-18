import {
  isNumber
} from './util';

import checkEnv from './environment';

import { googleReverseGeocode } from './geocoder';

const INTERNAL_CONFIG_ERROR = 'Configuration error';
const MISSING_QUERY_PARAMETERS = 'Missing or Invalid input parameters';
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
 * function handler
 * @param  {Object}   event    [description]
 * @param  {Object}   context  [description]
 * @param  {Function} callback [description]
 */
const handler = (event, context, callback) => {
  // check queryStringParameters
  if (!event.queryStringParameters || typeof event.queryStringParameters.lat === 'undefined' || typeof event.queryStringParameters.lng === 'undefined') {
    badRequest(MISSING_QUERY_PARAMETERS, callback);
    return;
  }
  if (checkEnv(process.env).length > 0) {
    badRequest(INTERNAL_CONFIG_ERROR, callback);
    return;
  }
  // if lat,lng
  if (event.queryStringParameters.lat === '' || event.queryStringParameters.lng === '') {
    badRequest(MISSING_QUERY_PARAMETERS, callback);
    return;
  }
  const lat = Number(event.queryStringParameters.lat);
  const lng = Number(event.queryStringParameters.lng);

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

export default handler;
