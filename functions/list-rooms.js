const utils = require('utils');

const listRooms = async () => {
  try {
    const { rooms } = await utils.hasura(`query {
      rooms {
        id
        name
        slug
      }
    }`);

    return rooms;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
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
