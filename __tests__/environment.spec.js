import checker from '../src/environment';

describe('Utility library envVarsChecker', () => {
  describe('Internal tests', () => {
    test('The helper exists', () => {
      expect(checker).toBeTruthy();
    });

    test('Asks for missing GOOGLE_API_KEY; OPCD_API_KEY and W3W_API_KEY environment variables', () => {
      const input = {};
      const result = checker(input);
      expect(result).toEqual(['GOOGLE_API_KEY', 'OPCD_API_KEY', 'W3W_API_KEY']);
    });

    test('Asks for a missing W3W_API_KEY environment variables', () => {
      const input = {
        GOOGLE_API_KEY: 'foo',
        OPCD_API_KEY: 'bar'
      };
      const result = checker(input);
      expect(result).toEqual(['W3W_API_KEY']);
    });

    test('Asks for a missing GOOGLE_API_KEY environment variables', () => {
      const input = {
        W3W_API_KEY: 'foo',
        OPCD_API_KEY: 'bar'
      };
      const result = checker(input);
      expect(result).toEqual(['GOOGLE_API_KEY']);
    });
  });
  // describe('Process', () => {
  //   test('Asks proecss env', () => {
  //     require('dotenv').config(); // eslint-disable-line
  //     const result = checker(process.env);
  //     expect(result).toEqual([]);
  //   });
  // });
});
