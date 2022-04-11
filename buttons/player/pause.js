const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: {
        name: 'pause'
    },

    run: async (client, interaction, player) => {

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('resume')
                .setLabel('Play ▶️')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('pause')
                .setLabel('Pause ⏸️')
                .setStyle(`SECONDARY`)
                .setDisabled(true),
            new MessageButton()
                .setCustomId('stop')
                .setLabel('Stop ⏹️')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('skip')
                .setLabel('Skip ⏭️')
                .setStyle('PRIMARY'),
        )

        const queue = player.getQueue(interaction.guildId)
        const track = queue.current
        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В настоящее время трек не воспроизводится')

        if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

        await queue.setPaused(true)

        const embedPlayer = new MessageEmbed()
            .setAuthor({ name: `Player`, iconURL: `${client.user.displayAvatarURL()}` })
            .setThumbnail(track.thumbnail)
            .setDescription(`🎶 |Сейчас играет [${track.author} - ${track.title}](${track.url})`)
            .setFooter({ text: `🕞 |Длительность ${track.duration}` });

        await interaction.message.edit({ embeds: [embedPlayer], components: [row] })

        embed
            .setTitle('✅ |Выполнено')
            .setDescription('Трек поставлен ​​на паузу!')

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}