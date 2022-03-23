const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Ставит трек на паузу"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		const embed = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		const embed1 = new MessageEmbed()
		.setTitle('Выполнено')
		.setDescription('Трек поставлен ​​на паузу!\nИспользуйте `/resume`, чтобы возобновить трек')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

		queue.setPaused(true)
        await interaction.reply({embeds: [embed1], ephemeral: true})
	},
}