const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("volume").setDescription("Регулировка громкости")
    .addNumberOption((option) => option.setName("set_volume").setDescription("Напишите громность от 0 до 100").setRequired(true).setMaxValue(100).setMinValue(0)),
	run: async ({ client, interaction }) => {
		
		const queue = client.player.getQueue(interaction.guildId)

        const volume = (interaction.options.getNumber("set_volume"))

        const embed = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

        const embed2 = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription("Введите корректное число")

        if(volume > 100) {
            return interaction.reply({embeds: [embed2], ephemeral: true})
        }

        if(volume === 0) {
            return interaction.reply({embeds: [embed2], ephemeral: true})
        }

        const embed1 = new MessageEmbed()
		.setTitle('Выполнено')
		.setDescription(`Текущая громкость ${volume}`)

		await queue.setVolume(volume)

        await interaction.reply({embeds: [embed1], ephemeral: true})
	},
}