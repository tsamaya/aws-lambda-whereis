import {
  parseGoogleAddressComponents,
  googleReverseGeocode,
  UNKNOWN_LOCATION
} from '../src/geocoder';

jest.mock('../src/api');

describe('Google Geocoder Library', () => {
  describe('Address Components parser', () => {
    test('undefined', () => {
      const components = undefined;
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe(UNKNOWN_LOCATION);
    });

    test('null', () => {
      const components = null;
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe(UNKNOWN_LOCATION);
    });

    test('empty string', () => {
      const components = '';
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe(UNKNOWN_LOCATION);
    });

    test('string', () => {
      const components = 'hello';
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe(UNKNOWN_LOCATION);
    });

    test('empty array', () => {
      const components = [];
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe(UNKNOWN_LOCATION);
    });

    test('Brooklyn, New York, United States', () => {
      const components = [{
        long_name: '277',
        short_name: '277',
        types: ['street_number']
      }, {
        long_name: 'Bedford Avenue',
        short_name: 'Bedford Ave',
        types: ['route']
      }, {
        long_name: 'Williamsburg',
        short_name: 'Williamsburg',
        types: ['neighborhood', 'political']
      }, {
        long_name: 'Brooklyn',
        short_name: 'Brooklyn',
        types: ['political', 'sublocality', 'sublocality_level_1']
      }, {
        long_name: 'Kings County',
        short_name: 'Kings County',
        types: ['administrative_area_level_2', 'political']
      }, {
        long_name: 'New York',
        short_name: 'NY',
        types: ['administrative_area_level_1', 'political']
      }, {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political']
      }, {
        long_name: '11211',
        short_name: '11211',
        types: ['postal_code']
      }];
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe('Brooklyn, New York, United States');
    });

    test('Westbourne Studios', () => {
      const components = [{
        long_name: 'Westbourne Studios',
        short_name: 'Westbourne Studios',
        types: ['premise']
      }, {
        long_name: '242',
        short_name: '242',
        types: ['street_number']
      }, {
        long_name: 'Acklam Road',
        short_name: 'Acklam Rd',
        types: ['route']
      }, {
        long_name: 'London',
        short_name: 'London',
        types: ['locality', 'political']
      }, {
        long_name: 'London',
        short_name: 'London',
        types: ['postal_town']
      }, {
        long_name: 'Greater London',
        short_name: 'Greater London',
        types: ['administrative_area_level_2', 'political']
      }, {
        long_name: 'England',
        short_name: 'England',
        types: ['administrative_area_level_1', 'political']
      }, {
        long_name: 'United Kingdom',
        short_name: 'GB',
        types: ['country', 'political']
      }, {
        long_name: 'W10 5JJ',
        short_name: 'W10 5JJ',
        types: ['postal_code']
      }];
      const actual = parseGoogleAddressComponents(components);
      expect(actual).toBe('London, England, United Kingdom');
    });
  });

  describe('googleReverseGeocode', () => {
    // beforeAll(() => {
    // });

    test('INVALID_REQUEST', () => {
      expect.assertions(1);
      return googleReverseGeocode('a', 'b').catch((data) => {
        // expect(data).toEqual({
        //   location: UNKNOWN_LOCATION
        // });
        expect(data).toEqual({
          error_message: 'Invalid request{...}',
          results: [],
          status: 'INVALID_REQUEST'
        });
      });
    });

    test('Brooklyn', () => {
      expect.assertions(1);
      return googleReverseGeocode(40.714224, -73.961452).then((data) => {
        console.log(data);
        expect(data).toEqual({
          location: 'Brooklyn, New York, United States',
          formatted_address: '277 Bedford Ave, Brooklyn, NY 11211, USA'
        });
      });
    });
  });
});
