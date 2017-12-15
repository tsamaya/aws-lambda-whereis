// const REQUIRED_ENV_VARS = ['GOOGLE_API_KEY', 'OPEN_CAGE_DATA_API_KEY', 'W3W_API_KEY'];
const REQUIRED_ENV_VARS = ['GOOGLE_API_KEY', 'OPCD_API_KEY', 'W3W_API_KEY'];

export default (env) => {
  const required = REQUIRED_ENV_VARS;
  const missing = [];

  required.forEach((reqVar) => {
    if (!env[reqVar]) {
      missing.push(reqVar);
    }
  });

  return missing;
};
