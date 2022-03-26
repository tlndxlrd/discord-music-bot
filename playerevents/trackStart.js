const client = require('../index').client
const { MessageEmbed } = require("discord.js")

module.exports = async (queue, track) => {
    let embed = new MessageEmbed()

    embed
    .setAuthor({name:`Player`, iconURL: `${client.user.displayAvatarURL()}`})
    .setThumbnail(track.thumbnail)
    .setDescription(`Сейчас играет [${track.author} - ${track.title}](${track.url})`)
    .setFooter({text: `Длительность ${track.duration}`})

    await queue.metadata.channel.send({embeds: [embed]})
    
    await client.user.setActivity(`${track.author} - ${track.title}`, { type: "LISTENING"});
}