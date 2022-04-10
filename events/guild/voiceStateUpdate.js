const profileModel = require('../../models/profileSchema')

module.exports = async (client, newstate, oldstate) => {
  const oldChannel = oldstate.channel
  const newChannel = newstate.channel

  if (newChannel != undefined && oldChannel == undefined) {

    if (newstate.guild.me.voice.channel?.id == newChannel.id) {

      if (newChannel.members.size <= 1) {

        profileData = await profileModel.findOne({ serverID: queue.metadata.channel.guild.id });
        try {
          await client.guilds.cache.get(profileData.serverID).channels.cache.get(profileData.channelDel).messages.fetch(profileData.msgDel).then(message => message.delete());
        } catch (e) {

        }

        let clienter = client.player;

        if (newstate.guild.me == client.user.id)

          clienter = client.player;

        const queue = clienter.getQueue(oldstate.guild.id);

        if (!queue?.playing) return

        await queue.clear()

        await queue.destroy();
      }
    }
  }
}
