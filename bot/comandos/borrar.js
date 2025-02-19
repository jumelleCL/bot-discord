const config = require("../config");

module.exports = (client, message) => {
    if (config.ownerIDS.includes(message.author.id)) {
        message.channel.bulkDelete()
            .then(() => {
                message.channel.send('Se han borrado todos los mensajes del canal.');
            })
            .catch((err) => {
                console.error(err);
                message.channel.send('Hubo un error al intentar borrar los mensajes del canal.');
            });
    } else {
        message.reply('Usted no tiene los permisos necesarios para usar este comando.');
    }
}
