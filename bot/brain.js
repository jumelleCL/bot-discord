const brain = require('brain.js');
const fs = require('fs');

const net = new brain.NeuralNetwork();

const trainingData = [
    { input: "hola", output: { respuesta: "Hola! ¿Cómo estás?" } },
    { input: "adiós", output: { respuesta: "Adiós! Que tengas un buen día!" } },
    { input: "cómo estás", output: { respuesta: "Estoy bien, gracias por preguntar!" } },
];

net.train(trainingData);

const model = net.toJSON();
fs.writeFileSync('model.json', JSON.stringify(model));

console.log('Modelo entrenado y guardado en model.json');
