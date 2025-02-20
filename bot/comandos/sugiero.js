import { MessageEmbed } from 'discord.js';

export default (client, message, args) => {
    if (!args.length) {
        return message.author.send('No puedes enviar una sugerencia vacía.');
    }

    const sugiero = args.join(' '); 
    const canal = client.channels.cache.get(process.env.SUGGESTION_CHANNEL_ID);

    if (!canal) {
        return message.author.send('No se encontró el canal de sugerencias.');
    }

    const SugieroEmbed = new MessageEmbed()
        .setColor('WHITE')
        .setTitle('Sugerencia:')
        .setAuthor({ name: 'Anónimo' })
        .setDescription(sugiero);

    if (message.channel.type === 'DM') {
        canal.send('@everyone');
        canal.send({ embeds: [SugieroEmbed] });
        message.author.send('Tu sugerencia ha sido enviada.');
    } else {
        message.channel.send({ content: 'Envía tu sugerencia por DM.', ephemeral: true });
    }
};
