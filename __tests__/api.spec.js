import { geocodeGoogle } from '../src/api';

import brooklynStub from './stubs/brooklyn.json';
import homeStub from './stubs/IndexHomeRaft.json';

jest.mock('../src/api');

describe('Third party API', () => {
  describe('google API', () => {
    test('INVALID_REQUEST', () => {
      expect.assertions(1);
      return geocodeGoogle({ latlng: 'lat,lng' })
        .catch(err => expect(err.response.data).toEqual({
          error_message: 'Invalid request{...}',
          results: [],
          status: 'INVALID_REQUEST'
        }));
    });

    test('brooklyn', () => {
      expect.assertions(1);
      return geocodeGoogle({ latlng: '40.714224,-73.961452' })
        .then(response => expect(response.data).toEqual(brooklynStub));
    });

    test('index.home.raft', () => {
      expect.assertions(1);
      return geocodeGoogle({ latlng: '51.521251,-0.203586' })
        .then(response => expect(response.data).toEqual(homeStub));
    });
  });
});
