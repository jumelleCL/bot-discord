import brain from 'brain.js';
import data from './training.json' assert { type: 'json' };
import fs from "fs";

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.input,
  output: item.output
}));

network.train(trainingData, {
  log: (error) => console.log(error),
  iterations: 10000,
  errorThresh: 0.0001
});

const networkState = network.toJSON();
fs.writeFileSync("network_state.json",  JSON.stringify(networkState), "utf-8");