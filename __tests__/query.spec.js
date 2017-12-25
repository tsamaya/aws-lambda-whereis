import checkQueryString from '../src/query';

const ERROR_MISSING_QUERY_PARAMETERS = {
  error: 'Missing or Invalid input parameters'
};

describe('QueryString parameters', () => {
  test('lib exists', () => {
    expect(checkQueryString).toBeTruthy();
  });
  test('undefined', () => {
    expect(checkQueryString()).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('empty', () => {
    expect(checkQueryString({})).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat undefiend,lng undefiend', () => {
    expect(checkQueryString({ lat: undefined, lng: undefined }))
      .toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat undefiend,lng 0', () => {
    expect(checkQueryString({ lat: undefined, lng: 0 })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat 0,lng undefiend', () => {
    expect(checkQueryString({ lat: 0, lng: undefined })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat empty,lng empty', () => {
    expect(checkQueryString({ lat: '', lng: '' })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat 0,lng empty', () => {
    expect(checkQueryString({ lat: 0, lng: '' })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat empty,lng 0', () => {
    expect(checkQueryString({ lat: '', lng: 0 })).toEqual(ERROR_MISSING_QUERY_PARAMETERS);
  });
  test('lat 0,lng 0', () => {
    expect(checkQueryString({ lat: 0, lng: 0 })).toEqual({
      operation: 'google',
      lat: 0,
      lng: 0
    });
  });
});
