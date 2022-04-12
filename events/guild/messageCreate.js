const usersEveryoneMap = new Map();
const usersSpamMap = new Map();

module.exports = async (client, message) => {

  if(message.author.bot || message.channel.type == 'DM') return;

  // console.log(message)

  //AntiSpam
  if(usersSpamMap.has(message.author.id)) {
    const userData = usersSpamMap.get(message.author.id);
    let {msgCount} = userData;
    msgCount += 1;
    userData.msgCount = msgCount;
    usersSpamMap.set(message.author.id, userData)
    if(msgCount >= 6) {
      message.delete()
    }
    if(msgCount === 9) {
      message.guild.members.cache.get(message.author.id).kick()
    }
  }
  else {
    usersSpamMap.set(message.author.id, {
      msgCount: 1
    });
  }

  //AntiEveryone
  if(message.mentions.everyone) {
    if(usersEveryoneMap.has(message.author.id)) {
      const userData = usersEveryoneMap.get(message.author.id);
      let { numberEveryoneSent } = userData;
      numberEveryoneSent += 1;
      userData.numberEveryoneSent = numberEveryoneSent;
      usersEveryoneMap.set(message.author.id, userData)
      if(numberEveryoneSent >= 3) {
        message.delete()
      }
      if(numberEveryoneSent === 5) {
        message.guild.members.cache.get(message.author.id).kick()
      }
    }
    else {
      usersEveryoneMap.set(message.author.id, {
        numberEveryoneSent: 1
      });
      setTimeout(() => {
        usersEveryoneMap.delete(message.author.id);
      }, 20000);
    }
  }
}