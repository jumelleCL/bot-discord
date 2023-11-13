const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let { readdirSync, read } = require('fs');

client.config = require('./config.js');

client.comandos = new Discord.Collection();    

for(const file of readdirSync('./comandos')) {
    if(file.endsWith('.js')) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./comandos/${file}`);
        client.comandos.set(fileName, fileContents);
    }
}

for(const file of readdirSync('./eventos')){
    if(file.endsWith('.js')){
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./eventos/${file}`);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./eventos/${file}`)];
    }
}

client.login(client.config.token)
    .then(() => {
        console.log(`${client.user.tag} esta listo`);
    })
    .catch((err) => {
        console.error(err);
    });

    