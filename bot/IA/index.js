import brain from "brain.js";
import fs from "fs";

let network = new brain.recurrent.LSTM();

if (fs.existsSync("./IA/network_state.json")) {
  const networkState = JSON.parse(
    fs.readFileSync("./IA/network_state.json", "utf-8").toString()
  );
  network.fromJSON(networkState);
  console.log("Modelo cargado correctamente.");
}  else {
  console.log(
    "No se encontró un modelo previamente entrenado. Empezando desde cero."
  );
}

export function askIA(text) {  
  const processedText = text.toLowerCase();
  const result = network.run(processedText);
  
  return result || "Lo siento, no entendi lo que me decis.";
}

