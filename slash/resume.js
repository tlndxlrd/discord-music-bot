const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Возобновляет воиспроизведение трека"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
		
		let embed = new MessageEmbed
		embed
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		let embed1 = new MessageEmbed
		embed1
		.setTitle('Выполнено')
		.setDescription('Возобновлено воиспроизведение трека! Используйте `/pause`, чтобы поставить трек на паузу')

		if (!queue) return await interaction.editReply({embeds: [embed]})

		queue.setPaused(false)
        await interaction.editReply({embeds: [embed1]})
	},
}