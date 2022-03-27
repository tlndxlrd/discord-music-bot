const { MessageEmbed } = require("discord.js")

module.exports = async (queue) => {
    let embed = new MessageEmbed()

    embed
    .setTitle('Упс..')
    .setDescription('Треки закончились, поэтому я пошел')

    queue.metadata.channel.send({embeds:[embed], ephemeral: true})
}