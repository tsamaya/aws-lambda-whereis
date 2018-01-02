// import { UNKNOWN_LOCATION } from '../src/const';

import { what3wordsGeocode } from '../src/geocoder';

jest.mock('../src/api');

describe('what3words Geocoder Library', () => {
  test('INVALID_REQUEST', () => {
    expect.assertions(1);
    return what3wordsGeocode('a').catch((data) => {
      // TODO :
      expect(data).toEqual({
        error_message: 'Invalid request{...}',
        results: [],
        status: 'INVALID_REQUEST'
      });
    });
  });
  test('index.home.raft', () => {
    expect.assertions(1);
    return what3wordsGeocode('index.home.raft').then((data) => {
      expect(data).toEqual({
        location: 'London, England, United Kingdom',
        words: 'index.home.raft',
        formatted_address: 'Westbourne Studios, 242 Acklam Rd, London W10 5JJ, UK'
      });
    });
  });
});
