/* 
This is the most simple command, it would work on all the channels of the server. 
This command is to control the bot, if you need it to say something you will write the command and it
would delete your command message and say the things you make them to say.
You need to change the 'id' on the message.author.id so it would only say the things if the Mod server says it
*/
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