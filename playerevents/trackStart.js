const client = require('../index').client
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = async (queue, track) => {
       
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('resume')
            .setLabel('Play ▶️')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('pause')
            .setLabel('Pause ⏸️')
            .setStyle('PRIMARY'),
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
    .setAuthor({name:`Player`, iconURL: `${client.user.displayAvatarURL()}`})
    .setThumbnail(track.thumbnail)
    .setDescription(`🎶 |Сейчас играет [${track.author} - ${track.title}](${track.url})`)
    .setFooter({text: `🕞 |Длительность ${track.duration}`})

    await queue.metadata.channel.send({embeds: [embed], components: [row]})
    
    await client.user.setActivity(`🎶 |${track.author} - ${track.title}`, { type: "LISTENING"});

}