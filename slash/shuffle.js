const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Перемешивает очередь из треков"),
	run: async (client, interaction) => {

		const queue = client.player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({ embeds: [embed], ephemeral: true })

		await queue.shuffle()

		embed
			.setTitle('✅ |Выполнено')
			.setDescription(`🎶 |Очередь треков из ${queue.tracks.length} смешана!`)

		await interaction.reply({ embeds: [embed], ephemeral: true })
	},
}