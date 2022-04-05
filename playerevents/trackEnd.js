const client = require('../index').client
const GUILD_ID = process.env.GUILD_ID

module.exports = async (queue, track) => {

    let messageDel = await client.msgIdDel.get('mmm')
    let channelDel = await client.channelIdDel.get('ccc')

    await client.guilds.cache.get(GUILD_ID).channels.cache.get(channelDel).messages.fetch(messageDel).then(message => message.delete());

    client.user.setActivity({
        name: '🎶 | Music Time',
        type: "PLAYING"
    });
}
