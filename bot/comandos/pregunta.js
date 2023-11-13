module.exports = (client, message, args) => {

    const { MessageEmbed } = require('discord.js');

    let pregunta = args.slice(0).join(' ');
    let canal = message.client.channels.cache.get('channel');

    let PreguntaEmbed = new MessageEmbed()
    .setColor('WHITE')
    .setTitle('Nueva pregunta: ')
    .setAuthor(`Anonimo`)
    .setDescription(pregunta)

    if(message.channel.type === 'dm') {
        canal.send('@everyone')
        canal.send(PreguntaEmbed)
        message.author.send('Se añadio su pregunta de manera anonima al canal de preguntas.')
    } else {
        message.channel.send({ content: 'Para realizar preguntas anonimas deben mandarlo a mis dms', ephemeral: true});
    }
}