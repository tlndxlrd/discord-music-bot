const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("stop").setDescription("Останавливает бота и очищает очередь из треков"),
	run: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		const embed = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		const embed1 = new MessageEmbed()
		.setTitle('Выполнено')
		.setDescription('Бот остановлен')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

		await queue.destroy()

        await interaction.reply({embeds: [embed1], ephemeral: true})
	},
}