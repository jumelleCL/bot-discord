/* 
An event to make a suggestion to the bot and he will say it anonymous on an especified channel.

You HAVE to change the setAuthor to 'anonymous' so the bot will not tell who said the sugestion, or
you can write message.author.username so it would no longer be anonymous. 

Also change the canal variable on 'channel' to the id of the channel you would like the bot sending 
the question to. 
*/
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