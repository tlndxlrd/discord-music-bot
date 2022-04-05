const client = require('../index').client
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const Discord = require("discord.js")

module.exports = async (queue, track, interaction) => {

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
    )

    let embed = new MessageEmbed()

    embed
        .setAuthor({ name: `Player`, iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(track.thumbnail)
        .setDescription(`🎶 |Сейчас играет [${track.author} - ${track.title}](${track.url})`)
        .setFooter({ text: `🕞 |Длительность ${track.duration}` })
    
     const message1 = await queue.metadata.channel.send({ embeds: [embed], components: [row] })

    //console.log(message1)

     const messageId = message1.id
     const channelId = message1.channelId

    client.msgIdDel = new Discord.Collection();
    client.channelIdDel = new Discord.Collection();

    const event = require('./trackEnd')

    const mmm = await client.msgIdDel.set('mmm', messageId)
    const ccc = await client.channelIdDel.set('ccc', channelId)

    console.log(mmm, ccc)

    await client.user.setActivity(`🎶 |${track.author} - ${track.title}`, { type: "LISTENING" });
    
}