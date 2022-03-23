const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Перемешивает очередь из треков"),
	run: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		const embed = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		const embed1 = new MessageEmbed()
		.setTitle('Выполнено')
		.setDescription(`Очередь треков из ${queue.tracks.length} смешана!`)

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

		await queue.shuffle()

        await interaction.reply({embeds: [embed1], ephemeral: true})
	},
}