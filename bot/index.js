import { Client, Intents } from "discord.js";
import { readdirSync } from "fs";
import dotenv from "dotenv";

import { askIA } from "./IA/index.js";
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['CHANNEL']
});

client.comandos = new Map();

for (const file of readdirSync("./comandos")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = await import(`./comandos/${file}`);
    client.comandos.set(fileName, fileContents.default);
  }
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = process.env.PREFIX || "Juancho";
  
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length).trim();
  const [comando, ...args] = commandBody.split(/ +/);

  if (client.comandos.has(comando)) {
    try {
      await client.comandos.get(comando)(client, message, args, process.env);
    } catch (err) {
      console.error(err);
      message.reply("Hubo un error al ejecutar el comando.");
    }
  } else {
    const iaResponse = await askIA(commandBody);  
    message.reply(`${iaResponse}`);
  }
});

client
  .login(process.env.TOKEN)  
  .then(() => {
    console.log(`${client.user.tag} está listo`);
  })
  .catch(console.error);
