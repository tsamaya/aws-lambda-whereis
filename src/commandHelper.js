import { MISSING_QUERY_PARAMETERS } from './const';

import { isUndefinedOrEmpty } from './util';

/**
 * parse query string and build the command object containing operation name,
 * and input parameters
 * @param  {Object} query QueryString
 * @return {Object}       CommandObject
 */
const parseQueryString = (query) => {
  const command = {};
  if (typeof query === 'undefined') {
    command.error = MISSING_QUERY_PARAMETERS;
  } else if ((isUndefinedOrEmpty(query.lat) || isUndefinedOrEmpty(query.lng))
            && isUndefinedOrEmpty(query.addr)) {
    // } else if (!isListParamValid([query.lat, query.lng])) {
    command.error = MISSING_QUERY_PARAMETERS;
  } else if (!isUndefinedOrEmpty(query.addr)) {
    command.operation = 'w3w';
    command.addr = query.addr;
  } else {
    command.operation = 'google';
    command.lat = Number(query.lat);
    command.lng = Number(query.lng);
  }
  return command;
};

export default parseQueryString;
