module.exports = (client, message) => {

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);  
    const command = args.shift().toLowerCase();

    let cmd = client.comandos.get(command);
    if(!cmd) return;

    cmd(client, message, args);
}