const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Пропускает текущий трек"),
	run: async (client, interaction, player) => {

		const queue = player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В настоящее время трек не воспроизводится')

		if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

		const currentSong = queue.current

		await queue.skip()

		embed
			.setTitle('✅ |Выполнено')
			.setDescription(`🎶 |${currentSong.author} - ${currentSong.title} был пропущен!`)
			.setThumbnail(currentSong.thumbnail)

		await interaction.reply({
			embeds: [embed], ephemeral: true
		})
	},
}