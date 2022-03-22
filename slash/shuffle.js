const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Перемешивает очередь из треков"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		let embed = new MessageEmbed
		embed
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		let embed1 = new MessageEmbed
		embed1
		.setTitle('Выполнено')
		.setDescription(`Очередь треков из ${queue.tracks.length} смешана!`)

		if (!queue) return await interaction.editReply({embeds: [embed]})

		queue.shuffle()
        await interaction.editReply({embeds: [embed1]})
	},
}