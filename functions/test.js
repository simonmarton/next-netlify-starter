const axios = require('axios');

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  require('dotenv').config();
}

exports.handler = async () => {
  console.log('hi Im a function', process.env);

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'This is a sample body',
      date: Date.now(),
      isProd,
      hasuraUrl: process.env.HASURA_URL,
    }),
  };
};

if (!isProd) {
  exports.handler();
}
