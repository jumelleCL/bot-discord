export default (client, message, args, config) => {
  if (config.ADMIN_ID.includes(message.author.id)) {
    const mensaje = args.join(" ").trim();

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
