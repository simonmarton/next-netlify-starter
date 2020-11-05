const axios = require('axios');
const dotenv = require('dotenv');

module.exports = {
  async hasura({ query, variables }) {
    dotenv.setup();
    const { HASURA_URL, HASURA_ADMIN } = process.env;

    const { statusText, data } = await axios.post(
      HASURA_URL,
      { query, variables },
      {
        headers: {
          'X-Hasura-Admin-Secret': HASURA_ADMIN,
        },
      }
    );

    if (statusText !== 'OK') {
      // TODO: better error handling
      throw new Error('nope');
    }

    return data.data;
  },
  isLocal() {
    return process.env.LOCAL === 'true';
  },
};
