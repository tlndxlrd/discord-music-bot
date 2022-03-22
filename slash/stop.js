const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("stop").setDescription("Останавливает бота и очищает очередь из треков"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		let embed = new MessageEmbed
		embed
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		let embed1 = new MessageEmbed
		embed1
		.setTitle('Выполнено')
		.setDescription('Бот остановлен')

		if (!queue) return await interaction.editReply({embeds: [embed]})

		queue.destroy()
        await interaction.editReply({embeds: [embed1]})
	},
}