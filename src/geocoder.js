import {
  geocodeGoogle
} from './api';

import {
  isArray
} from './util';

const UNKNOWN_LOCATION = 'Unknown location';

require('dotenv').config();

/**
 * parse Google Address Components using only
 * sublocality_level_1, postal_town, administrative_area_level_1 and country
 *
 * @param  {Object} addressComponents [description]
 * @return {String}                   [description]
 */
const parseGoogleAddressComponents = (addressComponents) => {
  let location = UNKNOWN_LOCATION;
  if (isArray(addressComponents)) {
    // empty location for concatenate components
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
    // is it still empty ?
    if (location === '') {
      location = UNKNOWN_LOCATION;
    }
  }
  return location;
};

/**
 * google Reverse Geocode lat, lng
 *
 *
 * @param  {Number} lat [description]
 * @param  {Number} lng [description]
 * @return {Promise}     [description]
 */
const googleReverseGeocode = (lat, lng) => {
  console.log('reverse geocode with google', lat, lng);
  const params = {};
  params.latlng = `${lat},${lng}`;
  params.key = process.env.GOOGLE_API_KEY;

  const pResult = new Promise((resolve, reject) => {
    geocodeGoogle(params).then((response) => {
      const result = {
        location: UNKNOWN_LOCATION
      };
      // console.log('200 response');
      if (response.data && response.data.results && response.data.results[0]) {
        const first = response.data.results[0];
        result.location = parseGoogleAddressComponents(first.address_components);
        if (first.formatted_address) {
          result.formatted_address = first.formatted_address;
        }
      }
      resolve(result);
    }).catch((err) => {
      // console.log('googleReverseGeocode err response', err);
      reject(err.response.data);
    });
  });
  return pResult;
};

export {
  googleReverseGeocode,
  parseGoogleAddressComponents,
  UNKNOWN_LOCATION
}; // eslint-disable-line
