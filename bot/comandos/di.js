/* 
This is the most simple command, it would work on all the channels of the server. 
This command is to control the bot, if you need it to say something you will write the command and it
would delete your command message and say the things you make them to say.
You need to change the 'id' on the message.author.id so it would only say the things if the Mod server says it
*/
const config = require("../config");

module.exports = (client, message, args) => {
  if (config.ownerIDS.includes(message.author.id)) {
    const mensaje = args.join(" ").trim(); // Unir args en un solo string

    if (mensaje.length > 0) {
      message.channel.send(mensaje)
        .catch(err => console.error("Error al enviar mensaje:", err));
    } else {
      console.warn("Intento de enviar un mensaje vacío, acción evitada.");
    }

    message.channel.bulkDelete(1)
      .catch(err => console.error("Error al borrar el mensaje:", err));
  } else {
    message.reply("Usted no tiene los permisos necesarios para usar este comando.");
  }
};
