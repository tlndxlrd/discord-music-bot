const player = require('../../index').player

module.exports = async (client, message) => {

  if(message.author.bot || message.channel.type == 'DM') return;

  let prefix = '=+'
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let command = client.command.get(cmd.slice(prefix.length)) || client.command.get(client.aliases.get(cmd.slice(prefix.length)));
  if (command) {
    if (!message.content.startsWith(prefix)) return;
    command.run(client, message, args, prefix, player)
  };
}