const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Пропускает текущий трек"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		let embed1 = new MessageEmbed
		embed1
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		if (!queue) return await interaction.editReply({embeds: [embed1]})

        const currentSong = queue.current

		queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} был пропущен!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}