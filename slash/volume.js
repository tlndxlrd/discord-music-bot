const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("volume").setDescription("Регулировка громкости")
    .addNumberOption((option) => option.setName("set_volume").setDescription("Напишите громность от 0 до 100").setRequired(true).setMaxValue(100).setMinValue(0)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
        const volume = (interaction.options.getNumber("set_volume"))

        let embed = new MessageEmbed
		embed
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		if (!queue) return await interaction.editReply({embeds: [embed]})

        let embed2 = new MessageEmbed
		embed2
		.setTitle('Ошибка')
		.setDescription("Введите корректное число")

        if(volume > 100) {
            return interaction.editReply({embeds: [embed2]})
        }

        if(volume === 0) {
            return interaction.editReply({embeds: [embed2]})
        }

        let embed1 = new MessageEmbed
		embed1
		.setTitle('Выполнено')
		.setDescription(`Текущая громкость ${volume}`)

		await queue.setVolume(volume)
        await interaction.editReply({embeds: [embed1]})
	},
}