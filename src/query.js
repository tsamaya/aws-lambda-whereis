const MISSING_QUERY_PARAMETERS = 'Missing or Invalid input parameters';
/**
 * [checkQueryString description]
 * @param  {Object} query [description]
 * @return {Object}       [description]
 */
const checkQueryString = (query) => {
  const result = {};
  if (typeof query === 'undefined' || typeof query.lat === 'undefined' || typeof query.lng === 'undefined') {
    result.error = MISSING_QUERY_PARAMETERS;
  } else if (query.lat === '' || query.lng === '') {
    result.error = MISSING_QUERY_PARAMETERS;
  } else {
    result.operation = 'google';
    result.lat = Number(query.lat);
    result.lng = Number(query.lng);
  }
  return result;
};

export default checkQueryString;
