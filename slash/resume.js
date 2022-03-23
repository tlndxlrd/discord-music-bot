const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Возобновляет воиспроизведение трека"),
	run: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)
		
		const embed = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		const embed1 = new MessageEmbed()
		.setTitle('Выполнено')
		.setDescription('Возобновлено воиспроизведение трека! Используйте `/pause`, чтобы поставить трек на паузу')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

		await queue.setPaused(false)

        await interaction.reply({embeds: [embed1], ephemeral: true})
	},
}