const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");

require("dotenv").config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['CHANNEL'] 
});

client.config = require("./config.js");
client.comandos = new Discord.Collection();

let { readdirSync } = require("fs");

for (const file of readdirSync("./comandos")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./comandos/${file}`);
    client.comandos.set(fileName, fileContents);
  }
}

for (const file of readdirSync("./eventos")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./eventos/${file}`);
    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./eventos/${file}`)];
  }
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  console.log(`Mensaje recibido: ${message.content}`);
});

client
  .login(client.config.token)
  .then(() => {
    console.log(`${client.user.tag} está listo`);
  })
  .catch(console.error);
