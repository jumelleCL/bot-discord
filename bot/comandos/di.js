
const config = require("../config");

module.exports = (client, message, args) => {
    
    if(message.author.id === 'id'){
    let texto = args.slice(0).join(' ');
    if(!texto) return message.channel.send('xd')
    
    message.channel.bulkDelete(1);
    message.channel.send(texto)
    }else{
        message.reply('Usted no tiene los permisos necesarios para usar este comando.')
    }
}