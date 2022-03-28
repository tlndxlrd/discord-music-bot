const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("volume").setDescription("Регулировка громкости")
    .addNumberOption((option) => option.setName("set_volume").setDescription("Напишите громность от 0 до 100").setRequired(true).setMaxValue(100).setMinValue(0)),
	run: async (client, interaction) => {
		
		const queue = client.player.getQueue(interaction.guildId)

        const volume = (interaction.options.getNumber("set_volume"))

        let embed = new MessageEmbed()

		embed
			.setTitle('❌ |Ошибка')
			.setDescription('В настоящее время трек не воспроизводится')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

        embed
			.setTitle('❌ |Ошибка')
			.setDescription("Введите корректное число")

        if(volume > 100) {
            return interaction.reply({embeds: [embed], ephemeral: true})
        }

        if(volume === 0) {
            return interaction.reply({embeds: [embed], ephemeral: true})
        }

        embed
			.setTitle('✅ |Выполнено')
			.setDescription(`Текущая громкость ${volume}`)

		await queue.setVolume(volume)

        await interaction.reply({embeds: [embed], ephemeral: true})
	},
}