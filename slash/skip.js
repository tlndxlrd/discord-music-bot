const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Пропускает текущий трек"),
	run: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		const embed1 = new MessageEmbed()
			.setTitle('Ошибка')
			.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({embeds: [embed1], ephemeral: true})

        const currentSong = queue.current

		await queue.skip()

        await interaction.reply({
            embeds: [new MessageEmbed()
				.setDescription(`${currentSong.title} был пропущен!`)
				.setThumbnail(currentSong.thumbnail)
            ], ephemeral: true
        })
	},
}