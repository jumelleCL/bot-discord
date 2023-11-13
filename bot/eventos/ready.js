const { Presence } = require('discord.js');

module.exports = (client, message) => {
    //Para iniciarlo:
    //npx nodemon index.js
    client.user.setActivity({
        name: 'Esperando comandos',
        type: 'PLAYING'
    })
    console.log('Sin errores')
}