const client = require('../index').client
const profileModel = require('../models/profileSchema')

module.exports = async (queue, track) => {

    profileData = await profileModel.findOne({ serverID: queue.metadata.channel.guild.id });
    try {
        await client.guilds.cache.get(profileData.serverID).channels.cache.get(profileData.channelDel).messages.fetch(profileData.msgDel).then(message => message.delete());
    } catch (e) {

    }
}
