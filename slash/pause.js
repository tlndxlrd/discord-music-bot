const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Ставит трек на паузу"),
	run: async (client, interaction) => {

		const queue = client.player.getQueue(interaction.guildId)

		let embed = new MessageEmbed()
		
		embed
			.setTitle('Ошибка')
			.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

		embed
			.setTitle('Выполнено')
			.setDescription('Трек поставлен ​​на паузу!\nИспользуйте `/resume`, чтобы возобновить трек')

		queue.setPaused(true)
        await interaction.reply({embeds: [embed], ephemeral: true})
	},
}