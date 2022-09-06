const client = require('../index').client
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const profileModel = require('../models/profileSchema')

module.exports = async (queue, track) => {

    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('resume')
            .setLabel('Play ▶️')
            .setStyle('SECONDARY')
            .setDisabled(true),
        new MessageButton()
            .setCustomId('pause')
            .setLabel('Pause ⏸️')
            .setStyle(`PRIMARY`),
        new MessageButton()
            .setCustomId('stop')
            .setLabel('Stop ⏹️')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('skip')
            .setLabel('Skip ⏭️')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('queue')
            .setLabel('🗨️ Queue')
            .setStyle('PRIMARY'),
    )

    const row1 = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('seek1')
            .setLabel('-15s ⏪')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId('seek2')
            .setLabel('+15s ⏩')
            .setStyle('PRIMARY'),
    )

    let embed = new MessageEmbed()

    embed
        .setAuthor({ name: `Player`, iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(track.thumbnail)
        .setDescription(`🎶 |Сейчас играет [${track.author} - ${track.title}](${track.url})`)
        .setFooter({ text: `🕞 |Длительность ${track.duration}` })

    const message1 = await queue.metadata.channel.send({ embeds: [embed], components: [row, row1] })

    let messageId = message1.id
    let channelId = message1.channelId
    let guildId = message1.guildId

    profileData = await profileModel.findOne({ serverID: guildId });
    if (!profileData) {
        let profile = await profileModel.create({
            serverID: guildId,
            channelDel: channelId,
            msgDel: messageId
        });
        profile.save();
    }

    if (profileData) {
        await profileModel.findOneAndUpdate({ serverID: guildId },
            {
                channelDel: channelId,
                msgDel: messageId
            })
    }
}