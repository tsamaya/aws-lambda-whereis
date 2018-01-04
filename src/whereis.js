import { INVALID_COORDS_PARAMETERS } from './const';

import { isNumber } from './util';
import { googleReverseGeocode, what3wordsGeocode } from './geocoder';

import parseQueryString from './commandHelper';

/**
 * return a bad request (HTTP 400) response withe the given mmessage
 * @param  {Object}   data  error object
 * @param  {Function} callback [description]
 */
const badRequest = (data, callback) => {
  console.warn('bad request:', data);
  callback(null, {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({
      error: 400,
      message: data,
    })
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
    return;
  }
  const p = googleReverseGeocode(lat, lng);
  p.then((response) => {
    success(response, callback);
  }).catch((err) => {
    badRequest(err, callback);
  });
};

/**
 * [operationWhat3words description]
 * @param  {String}   addr     3 word address
 * @param  {Function} callback [description]
 */
const operationWhat3words = (addr, callback) => {
  const p = what3wordsGeocode(addr);
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
  // checkEnv unused as webpack and dotenv hardcode values in bundle file
  // if (checkEnv(process.env).length > 0) {
  //   badRequest(INTERNAL_CONFIG_ERROR, callback);
  //   return;
  // }
  // check queryStringParameters
  const command = parseQueryString(event.queryStringParameters);
  if (command.error) {
    badRequest(command.error, callback);
    return;
  }
  if (command.operation === 'google') {
    operationGoogle(command.lat, command.lng, callback);
  } else {
    operationWhat3words(command.addr, callback);
  }
};

export default handler;
