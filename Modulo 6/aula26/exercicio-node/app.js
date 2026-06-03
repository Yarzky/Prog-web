const { getRandomInt, getRandomColour } = require('./utils');
const fs = require('fs');

const text = getRandomInt(1, 100) + '\n' + getRandomColour();

console.log(text);

fs.writeFile('texto.txt', text, (err) => {
  if (err) throw err;
  console.log('Arquivo salvo com sucesso!');
});

