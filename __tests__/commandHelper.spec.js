import parseQueryString from '../src/commandHelper';
import { MISSING_QUERY_PARAMETERS } from '../src/const';

const ERROR_MISSING_QUERY_PARAMETERS = {
  error: MISSING_QUERY_PARAMETERS
};

describe('QueryString parameters', () => {
  test('lib exists', () => {
    expect(parseQueryString).toBeTruthy();
  });
  test('query undefined', () => {
    expect(parseQueryString()).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('query empty object', () => {
    expect(parseQueryString({})).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat undefined,lng undefined', () => {
    expect(parseQueryString({ lat: undefined, lng: undefined }))
      .toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat undefined,lng 0', () => {
    expect(parseQueryString({ lat: undefined, lng: 0 })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat NaN,lng NaN', () => {
    expect(parseQueryString({ lat: NaN, lng: NaN })).toEqual({
      operation: 'google',
      lat: NaN,
      lng: NaN
    });
  });
  test('lat "NaN",lng "NaN"', () => {
    expect(parseQueryString({ lat: 'NaN', lng: 'NaN' })).toEqual({
      operation: 'google',
      lat: NaN,
      lng: NaN
    });
  });
  test('lat 0,lng undefined', () => {
    expect(parseQueryString({ lat: 0, lng: undefined })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat empty string,lng empty string', () => {
    expect(parseQueryString({ lat: '', lng: '' })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat 0,lng empty string', () => {
    expect(parseQueryString({ lat: 0, lng: '' })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat empty string,lng 0', () => {
    expect(parseQueryString({ lat: '', lng: 0 })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('addr empty string', () => {
    expect(parseQueryString({ addr: '' })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat 0,lng 0', () => {
    expect(parseQueryString({ lat: 0, lng: 0 })).toEqual({
      operation: 'google',
      lat: 0,
      lng: 0
    });
  });
  test('lat 12,lng 24', () => {
    expect(parseQueryString({ lat: 12, lng: 24 })).toEqual({
      operation: 'google',
      lat: 12,
      lng: 24
    });
  });
  test('lat -12,lng 24', () => {
    expect(parseQueryString({ lat: -12, lng: 24 })).toEqual({
      operation: 'google',
      lat: -12,
      lng: 24
    });
  });
  test('lat 12,lng -24', () => {
    expect(parseQueryString({ lat: 12, lng: -24 })).toEqual({
      operation: 'google',
      lat: 12,
      lng: -24
    });
  });
  test('lat -12,lng -24', () => {
    expect(parseQueryString({ lat: -12, lng: -24 })).toEqual({
      operation: 'google',
      lat: -12,
      lng: -24
    });
  });
  test('lat 2.7e-5,lng 2.7e-5', () => {
    expect(parseQueryString({ lat: 2.7e-5, lng: 2.7e-5 })).toEqual({
      operation: 'google',
      lat: 2.7e-5,
      lng: 2.7e-5
    });
  });
  test('lat -2.7e-5,lng 2.7e-5', () => {
    expect(parseQueryString({ lat: -2.7e-5, lng: 2.7e-5 })).toEqual({
      operation: 'google',
      lat: -2.7e-5,
      lng: 2.7e-5
    });
  });
  test('lat 2.7e-5,lng -2.7e-5', () => {
    expect(parseQueryString({ lat: 2.7e-5, lng: -2.7e-5 })).toEqual({
      operation: 'google',
      lat: 2.7e-5,
      lng: -2.7e-5
    });
  });
  test('lat -2.7e-5,lng -2.7e-5', () => {
    expect(parseQueryString({ lat: -2.7e-5, lng: -2.7e-5 })).toEqual({
      operation: 'google',
      lat: -2.7e-5,
      lng: -2.7e-5
    });
  });
  test('addr plan.clips.above', () => {
    expect(parseQueryString({ addr: 'plan.clips.above' })).toEqual({
      operation: 'w3w',
      addr: 'plan.clips.above'
    });
  });
});
