export default (client, message, args) => {
    const { MessageEmbed } = require('discord.js');

    let texto1 = args.slice(1).join(' ');
    let denunciado = message.client.users.cache.get(args[1]);
    let texto2 = args.slice(3).join(' ');
    let confessiones = message.client.channels.cache.get(process.env.CONFESSION_CHANNEL_ID);

    let TextoConfesion = new MessageEmbed()
        .setColor('WHITE')
        .setTitle('NUEVA CONFESION')
        .setAuthor('Anonimo')
        .setDescription('Una persona confiesa: ' + texto1);

    let TextoConfesion1 = new MessageEmbed()
        .setColor('WHITE')
        .setTitle('Una persona anonima tiene una confesion para usted.')
        .setAuthor(message.author.username)
        .setDescription(`Le dice a ${denunciado} que: ` + texto2);

    if (message.channel.type === 'DM') {
        if (args[0] == 'que') {
            confessiones.send({ embeds: [TextoConfesion] });
            message.author.send('Mensaje enviado de manera anonima.');
        }

        if (args[0] == 'a') {
            confessiones.send({ embeds: [TextoConfesion1] });
            message.author.send('Mensaje enviado a su dm de manera anonima');
        }
    } else {
        if (message.channel.isText() && message.guild) {
            message.channel.bulkDelete(1)
                .then(() => {
                    message.channel.send('Para enviar confesiones anonimas mande su confesion al DM.');
                })
                .catch(err => console.error('Error al eliminar el mensaje:', err));
        } else {
            message.author.send('Para enviar confesiones anonimas mande su confesion al DM.');
        }
    }
};
