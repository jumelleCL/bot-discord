const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const fs = require('fs');
const brain = require('brain.js');

// Crear el cliente de Discord
const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.config = require('./config.js');

client.comandos = new Discord.Collection();

let { readdirSync } = require('fs');

for (const file of readdirSync('./comandos')) {
    if (file.endsWith('.js')) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./comandos/${file}`);
        client.comandos.set(fileName, fileContents);
    }
}

for (const file of readdirSync('./eventos')) {
    if (file.endsWith('.js')) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./eventos/${file}`);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./eventos/${file}`)];
    }
}

client.login(client.config.token)
    .then(() => {
        console.log(`${client.user.tag} está listo`);
    })
    .catch((err) => {
        console.error(err);
    });

// Verificar si el archivo de modelo existe
const modelPath = 'model.json';
let net;

if (!fs.existsSync(modelPath)) {
    console.log('No se encontró model.json. Entrenando y creando el modelo...');

    // Crear la red neuronal
    net = new brain.NeuralNetwork();

    // Datos de entrenamiento
    const trainingData = [
        { input: "hola", output: { respuesta: "Hola! ¿Cómo estás?" } },
        { input: "adiós", output: { respuesta: "Adiós! Que tengas un buen día!" } },
        { input: "cómo estás", output: { respuesta: "Estoy bien, gracias por preguntar!" } },
        // Añade más ejemplos según sea necesario
    ];

    // Entrenar la red
    net.train(trainingData);

    // Guardar el modelo en un archivo
    const model = net.toJSON();
    fs.writeFileSync(modelPath, JSON.stringify(model));

    console.log('Modelo entrenado y guardado en model.json');
} else {
    // Cargar el modelo desde el archivo
    const modelData = fs.readFileSync(modelPath);
    net = new brain.NeuralNetwork();
    net.fromJSON(JSON.parse(modelData));

    console.log('Modelo cargado desde model.json');
}

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const output = net.run(message.content);
    message.channel.send(output.respuesta);
});

client.login(client.config.token)
    .then(() => {
        console.log(`${client.user.tag} está conectado`);
    })
    .catch((err) => {
        console.error(err);
    });
