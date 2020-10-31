const axios = require('axios');
require('dotenv').config();

const { LOCAL, HASURA_URL, HASURA_ADMIN } = process.env;
const isLocal = LOCAL === 'true';

const listRooms = async () => {
  const { statusText, data } = await axios.post(
    HASURA_URL,
    {
      query: `query {
        rooms {
          id
          name
          slug
        }
      }`,
    },
    {
      headers: {
        'X-Hasura-Admin-Secret': HASURA_ADMIN,
      },
    }
  );

  if (statusText !== 'OK') {
    throw new Error('nope');
  }

  return data.data.rooms;
};

exports.handler = async () => {
  const rooms = await listRooms();

  return {
    statusCode: 200,
    body: JSON.stringify(rooms),
  };
};

if (isLocal) {
  (async () => {
    console.log(await exports.handler());
  })();
}
