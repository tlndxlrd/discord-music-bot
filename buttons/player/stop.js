const { MessageEmbed } = require("discord.js")

module.exports = {
    data: {
        name: 'stop'
    },

    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guildId)
        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В настоящее время трек не воспроизводится')

        if (!queue) return interaction.reply({ embeds: [embed], ephemeral: true })

        await queue.clear()

        await queue.destroy()

        embed
            .setTitle('✅ |Выполнено')
            .setDescription('Бот остановлен')

        await interaction.reply({ embeds: [embed], ephemeral: true })

        await interaction.message.delete()
    }
}