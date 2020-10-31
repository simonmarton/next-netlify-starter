const axios = require('axios');
require('dotenv').config();
const generateSlug = require('../utils/slug-generator');

const { LOCAL, HASURA_URL, HASURA_ADMIN } = process.env;
const isLocal = LOCAL === 'true';

const createRoom = async (name) => {
  const slug = generateSlug();

  const { statusText, data } = await axios.post(
    HASURA_URL,
    {
      query: `mutation createRoom ($name: String!, $slug: String!) {
        insert_rooms_one(object: {name: $name, slug: $slug}) {
          id
          name
          slug
        }
      }`,
      variables: { name, slug },
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

  return data.data.insert_rooms_one;
};

exports.handler = async ({ queryStringParameters }) => {
  const { name } = queryStringParameters;
  const room = await createRoom(name);

  return {
    statusCode: 200,
    body: JSON.stringify(room),
  };
};

if (isLocal) {
  (async () => {
    console.log(await exports.handler());
  })();
}
