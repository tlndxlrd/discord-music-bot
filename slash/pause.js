const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Ставит трек на паузу"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		let embed = new MessageEmbed
		embed
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		let embed1 = new MessageEmbed
		embed1
		.setTitle('Выполнено')
		.setDescription('Трек поставлен ​​на паузу!\nИспользуйте `/resume`, чтобы возобновить трек')

		if (!queue) return await interaction.editReply({embeds: [embed]})

		queue.setPaused(true)
        await interaction.editReply({embeds: [embed1]})
	},
}