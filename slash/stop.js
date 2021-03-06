const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("stop").setDescription("Останавливает бота и очищает очередь из треков"),
	run: async (client, interaction, player) => {

		const queue = player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В настоящее время трек не воспроизводится')

		if (!queue) return interaction.reply({ embeds: [embed], ephemeral: true })

		await queue.destroy()

		embed
			.setTitle('✅ |Выполнено')
			.setDescription('Бот остановлен')

		await interaction.reply({ embeds: [embed], ephemeral: true })
	},
}