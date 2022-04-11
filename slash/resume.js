const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Возобновляет воиспроизведение трека"),
	run: async (client, interaction, player) => {

		const queue = player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

		if (queue.connection.paused === false) {
            embed
            .setTitle('❌ |Ошибка')
            .setDescription('Трек уже воспроизводиться')
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

		await queue.setPaused(false)

		embed
			.setTitle('✅ |Выполнено')
			.setDescription('Возобновлено воиспроизведение трека! Используйте `/pause`, чтобы поставить трек на паузу')

		await interaction.reply({ embeds: [embed], ephemeral: true })
	},
}