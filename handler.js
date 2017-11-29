require('dotenv').config();
const axios = require('axios');

const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const W3W_GEOCODE_URL = 'https://api.what3words.com/v2/forward';
const UNKNOWN_LOCATION = 'Unknown location';
const googleGeocode = params => axios.get(GOOGLE_GEOCODE_URL, {
  params
});
const geocodeW3W = params => axios.get(W3W_GEOCODE_URL, {
  params
});

const parseGoogleAddressComponents = (addressComponents) => {
  let location = UNKNOWN_LOCATION;
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

module.exports.whereIs = (event, context, callback) => {
  // check queryStringParameters
  if (!event.queryStringParameters || typeof event.queryStringParameters.lat === 'undefined' || typeof event.queryStringParameters.lng === 'undefined') {
    callback(null, {
      statusCode: 400,
      body: {
        error: 400,
        message: 'Couldn\'t read query parameters',
      }
    });
    return;
  }

  const params = {};

  params.latlng = `${event.queryStringParameters.lat},${event.queryStringParameters.lng}`;
  params.key = process.env.GOOGLE_API_KEY;

  const p = googleGeocode(params);

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
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    });
  }).catch((err) => {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(err.response.data)
    });
  });
};

module.exports.whereIsWhat3words = (event, context, callback) => {
  if (!event.queryStringParameters) {
    callback(null, {
      statusCode: 400,
      body: {
        error: 400,
        message: 'Couldn\'t read query parameters',
      }
    });
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
      const gp = googleGeocode(gparams);
      gp.then((gresponse) => {
        if (gresponse.data && gresponse.data.results && gresponse.data.results[0]) {
          const first = gresponse.data.results[0];
          // result.location = first;
          result.location = parseGoogleAddressComponents(first.address_components);
          if (first.formatted_address) {
            result.formatted_address = first.formatted_address;
          }
        }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result)
        });
      });
    }
  }).catch((err) => {
    // console.log(err.data);
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(err.response.data)
    });
  });
};
