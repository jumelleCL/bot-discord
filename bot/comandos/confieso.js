module.exports = (client, message, args) => {

    const { MessageEmbed } = require('discord.js');

    let texto1 = args.slice(1).join(' ');
    let denunciado = message.client.users.cache.get(args[1]);
    let texto2 = args.slice(3).join(' ');
    let dif1 = args[1] == 'a'
    let dif = args[1] == 'que'
    let confessiones = message.client.channels.cache.get('channel');


    let TextoConfesion = new MessageEmbed()
    .setColor('WHITE')
	.setTitle('NUEVA CONFESION')
    .setAuthor(`Anonimo`)
    .setDescription('Una persona confiesa: ' + texto1);

    let TextoConfesion1 = new MessageEmbed()
    .setColor('WHITE')
	.setTitle('Una persona anonima tiene una confesion para usted.')
    .setAuthor(`${message.author.username}`)
    .setDescription(`Le dice a ${denunciado} que: ` + texto2);

    if(message.channel.type === 'dm') {

        if (args[0] == 'que') {
            confessiones.send(TextoConfesion)
            message.author.send('Mensaje enviado de manera anonima.')
        }

        if (args[0] == 'a') {
            confessiones.send(TextoConfesion1)
            message.author.send('Mensaje enviado a su dm de manera anonima')
        }

    } else {
            message.channel.bulkDelete(1)
            message.channel.send('Para enviar confesiones anonimas mande su confesion al dm.')
        }

}