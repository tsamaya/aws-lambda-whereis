/**
 * Third party API
 */

const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const W3W_GEOCODE_URL = 'https://api.what3words.com/v2/forward';
const OPEN_CAGE_DATA_URL = 'https://api.opencagedata.com/geocode/v1/json';

const axios = require('axios');

const geocodeGoogle = params => axios.get(GOOGLE_GEOCODE_URL, {
  params
});

const geocodeOCD = params => axios.get(OPEN_CAGE_DATA_URL, {
  params
});

const geocodeW3W = params => axios.get(W3W_GEOCODE_URL, {
  params
});

export { geocodeGoogle, geocodeOCD, geocodeW3W };
