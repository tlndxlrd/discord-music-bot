const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: 'pause'
    },

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guildId)
        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В настоящее время трек не воспроизводится')

        if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

        embed
            .setTitle('✅ |Выполнено')
            .setDescription('Трек поставлен ​​на паузу!')

        queue.setPaused(true)
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}