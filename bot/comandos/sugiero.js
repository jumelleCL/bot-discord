module.exports = (client, message, args) => {

    const { MessageEmbed } = require('discord.js');
    let sugiero = args.slice(0).join(' ');
    //let canal = message.client.channels.cache.get('1009561120018804828');
    const canal = message.canal.id('channel'); 

    let SugieroEmbed = new MessageEmbed()
    .setColor('WHITE')
    .setTitle('Sugerencia:')
    .setAuthor(`Anonimo`)
    .setDescription(sugiero)

    if(message.channel.type === 'dm') {
        canal.send('@everyone')
        canal.send(SugieroEmbed)
        message.author.send('Sugerencia nueva:) ')
    } else {
        message.channel.send({ content: '...', ephemeral: true});
    }
}