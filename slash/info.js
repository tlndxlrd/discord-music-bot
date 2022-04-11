const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Отображает информацию о воспроизводимой в данный момент треке"),
	run: async (client, interaction, player) => {
		const queue = player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В настоящее время трек не воспроизводится')

		if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

		const song = queue.current

		embed
			.setTitle('✅ |Выполнено')
			.setThumbnail(song.thumbnail)
			.setDescription(`🎶 |Сейчас играет [${song.author} - ${song.title}](${song.url})\n\n` + bar)

		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		})
	},
}