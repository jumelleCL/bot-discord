export default async (client, message, args, config) => {
    if (config.ADMIN_ID.includes(message.author.id)) {
        try {
            let mensajes;
            
            do {
                mensajes = await message.channel.messages.fetch({ limit: 100 });
                const recientes = mensajes.filter(msg => Date.now() - msg.createdTimestamp < 14 * 24 * 60 * 60 * 1000);
                const antiguos = mensajes.filter(msg => Date.now() - msg.createdTimestamp >= 14 * 24 * 60 * 60 * 1000);

                if (recientes.size > 0) {
                    await message.channel.bulkDelete(recientes, true);
                }

                for (const msg of antiguos.values()) {
                    await msg.delete();
                }
            } while (mensajes.size > 0);
            
            message.channel.send('Se han borrado todos los mensajes del canal.');
        } catch (err) {
            console.error(err);
            message.channel.send('Hubo un error al intentar borrar los mensajes del canal.');
        }
    } else {
        message.reply('Usted no tiene los permisos necesarios para usar este comando.');
    }
}
