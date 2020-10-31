const { colors, animals } = require('./slug-parts-data.json');

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const generateSlug = () => {
  const color = randomItem(colors),
    animal = randomItem(animals);

  const idx = Math.ceil(Math.random() * 99);

  return `${color}-${animal}-${idx}`;
};

module.exports = generateSlug;
