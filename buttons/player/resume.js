const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: 'resume'
    },

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guildId)
        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В очереди нет треков')

        if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

        await queue.setPaused(false)

        embed
            .setTitle('✅ |Выполнено')
            .setDescription('Возобновлено воиспроизведение трека!')

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}