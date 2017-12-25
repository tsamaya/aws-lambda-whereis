import brooklynStub from '../../__tests__/stubs/brooklyn.json';
import homeStub from '../../__tests__/stubs/IndexHomeRaft.json';
import tokyoStub from '../../__tests__/stubs/tokyo.json';

const geocodeGoogle = (params) => {
  // console.log('in geocodeGoogle mock function', params);
  if (params.latlng === '40.714224,-73.961452') {
    return new Promise((resolve /* , reject */) => {
      resolve({ data: brooklynStub });
    });
  } else if (params.latlng === '51.521251,-0.203586') {
    return new Promise((resolve /* , reject */) => {
      resolve({ data: homeStub });
    });
  } else if (params.latlng === '35.6894875,139.6917064') {
    return new Promise((resolve /* , reject */) => {
      resolve({ data: tokyoStub });
    });
  } else if (params.latlng === 'ze,ro') {
    return new Promise((resolve /* , reject */) => {
      resolve({ data: { results: [], status: 'ZERO_RESULTS' } });
    });
  }
  return new Promise((resolve, reject) => {
    reject({
      response: {
        data: {
          error_message: 'Invalid request{...}',
          results: [],
          status: 'INVALID_REQUEST'
        }
      }
    });
  });
};

export {
  geocodeGoogle // eslint-disable-line
};
