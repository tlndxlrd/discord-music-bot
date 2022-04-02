const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Ставит трек на паузу"),
	run: async (client, interaction) => {

		const queue = client.player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В настоящее время трек не воспроизводится')

		if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

		embed
			.setTitle('✅ |Выполнено')
			.setDescription('Трек поставлен ​​на паузу!\nИспользуйте `/resume`, чтобы возобновить трек')

		if (queue.connection.paused === true) {
			embed
				.setTitle('❌ |Ошибка')
				.setDescription('Трек уже на паузе')
			await interaction.reply({ embeds: [embed], ephemeral: true })
			return
		}

		await queue.setPaused(true)

		await interaction.reply({ embeds: [embed], ephemeral: true })
	},
}