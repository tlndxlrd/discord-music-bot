const { MessageEmbed } = require("discord.js")
const { timeToSec } = require('../../func')

module.exports = {
    data: {
        name: 'seek2'
    },

    run: async (client, interaction, player) => {

        const queue = player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В настоящее время трек не воспроизводится')

        if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

        const currentSong = queue.current

        const perc = queue.getPlayerTimestamp();
        console.log(perc.current)
        const realtime = timeToSec(`0:${perc.current}`)
        const endtrack = timeToSec(`0:${perc.end}`)

        let timet = realtime + 15000

        if(timet > endtrack ) timet = endtrack

        await queue.seek(timet)

        embed
            .setTitle('✅ |Выполнено')
            .setDescription(`🎶 |${currentSong.author} - ${currentSong.title} был промотан на 15с`)
            .setThumbnail(currentSong.thumbnail)

        await interaction.reply({
            embeds: [embed], ephemeral: true
        })
    }
}