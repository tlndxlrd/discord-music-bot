const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Переход к определенному треку в очереди")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("Трек, на который нужно перейти").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()

		embed
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

        embed
		.setTitle('Ошибка')
		.setDescription('Неверный номер трека')

		embed
		.setTitle('Выполнено')
		.setDescription(`Треки пропущены, номер трека ${trackNum}`)

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

        const trackNum = interaction.options.getNumber("tracknumber")

        if (trackNum > queue.tracks.length){
			return await interaction.reply({embeds: [embed], ephemeral: true})
		}
        
		await queue.skipTo(trackNum - 1)

        await interaction.reply({embeds: [embed], ephemeral: true})
	},
}