require('dotenv').config();
const axios = require('axios');

const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const W3W_GEOCODE_URL = 'https://api.what3words.com/v2/forward';
const OPEN_CAGE_DATA_URL = 'https://api.opencagedata.com/geocode/v1/json';
const UNKNOWN_LOCATION = 'Unknown location';

const MISSING_QUERY_PARAMETERS = 'Couldn\'t read query parameters';

const geocodeGoogle = params => axios.get(GOOGLE_GEOCODE_URL, {
  params
});

const geocodeODC = params => axios.get(OPEN_CAGE_DATA_URL, {
  params
});

const geocodeW3W = params => axios.get(W3W_GEOCODE_URL, {
  params
});

const badRequest = (message, callback) => {
  console.warn(message);
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

const success = (data, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: data
  });
};

const parseGoogleAddressComponents = (addressComponents) => {
  let location = UNKNOWN_LOCATION;
  location = '';
  addressComponents.forEach((component) => {
    const addressTypes = component.types;

    addressTypes.forEach((type) => {
      if (type === 'sublocality_level_1') {
        location += `${component.long_name}, `;
      }
      if (type === 'postal_town') {
        location += `${component.long_name}, `;
      }
      if (type === 'administrative_area_level_1') {
        location += `${component.long_name}, `;
      }
      if (type === 'country') {
        location += component.long_name;
      }
    });
  });
  return location;
};

const whereIs = (event, context, callback) => {
  // check queryStringParameters
  if (!event.queryStringParameters || typeof event.queryStringParameters.lat === 'undefined' || typeof event.queryStringParameters.lng === 'undefined') {
    badRequest(MISSING_QUERY_PARAMETERS, callback);
    return;
  }

  const params = {};

  params.latlng = `${event.queryStringParameters.lat},${event.queryStringParameters.lng}`;
  params.key = process.env.GOOGLE_API_KEY;

  const p = geocodeGoogle(params);

  p.then((response) => {
    const result = {
      location: UNKNOWN_LOCATION
    };
    if (response.data && response.data.results && response.data.results[0]) {
      const first = response.data.results[0];
      result.location = parseGoogleAddressComponents(first.address_components);
      if (first.formatted_address) {
        result.formatted_address = first.formatted_address;
      }
    }
    success(JSON.stringify(result), callback);
  }).catch((err) => {
    badRequest(JSON.stringify(err.response.data), callback);
  });
};

const whereIsWhat3words = (event, context, callback) => {
  if (!event.queryStringParameters) {
    badRequest(MISSING_QUERY_PARAMETERS, callback);
    return;
  }
  const params = event.queryStringParameters;
  params.key = process.env.W3W_API_KEY;
  const p = geocodeW3W(params);
  p.then((response) => {
    const result = {
      location: UNKNOWN_LOCATION
    };
    if (response.data && response.data.geometry) {
      const gparams = {};
      gparams.latlng = `${response.data.geometry.lat},${response.data.geometry.lng}`;
      gparams.key = process.env.GOOGLE_API_KEY;
      const gp = geocodeGoogle(gparams);
      gp.then((gresponse) => {
        if (gresponse.data && gresponse.data.results && gresponse.data.results[0]) {
          const first = gresponse.data.results[0];
          // result.location = first;
          result.location = parseGoogleAddressComponents(first.address_components);
          if (first.formatted_address) {
            result.formatted_address = first.formatted_address;
          }
        }
        success(JSON.stringify(result), callback);
      });
    }
  }).catch((err) => {
    // console.log(err.data);
    badRequest(JSON.stringify(err.response.data), callback);
  });
};

const whereIsOCD = (event, context, callback) => {
  // check queryStringParameters
  if (!event.queryStringParameters || typeof event.queryStringParameters.lat === 'undefined' || typeof event.queryStringParameters.lng === 'undefined') {
    badRequest(MISSING_QUERY_PARAMETERS, callback);
    return;
  }
  const params = {};

  params.q = `${event.queryStringParameters.lat},${event.queryStringParameters.lng}`;
  params.key = process.env.OPCD_API_KEY;

  const p = geocodeODC(params);

  p.then((response) => {
    const result = {
      location: UNKNOWN_LOCATION
    };
    if (response.data && response.data.results && response.data.results[0] &&
      response.data.results[0].geometry) {
      const first = response.data.results[0];
      result.location = first.components; // parseGoogleAddressComponents(first.components);
      if (first.formatted) {
        result.formatted_address = first.formatted;
      }
    }
    success(JSON.stringify(result), callback);
  }).catch((err) => {
    badRequest(JSON.stringify(err.response.data), callback);
  });
};

module.exports.whereIs = whereIs;
module.exports.whereIsWhat3words = whereIsWhat3words;
module.exports.whereIsOCD = whereIsOCD;
