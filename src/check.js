import envChecker from './environment';

require('dotenv').config();

export const handler = (event, context, callback) => { // eslint-disable-line
  const missing = envChecker(process.env);
  const result = 'success';
  if (missing.length) {
    const vars = missing.join(', ');
    const message = `Missing required environment variables: ${vars}`;
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: {
        message: JSON.stringify(message),
      }
    });
    return;
  }
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: {
      message: JSON.stringify(result),
    }
  });
};
