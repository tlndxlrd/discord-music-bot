const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")


module.exports = {
	data: new SlashCommandBuilder().setName("repeat").setDescription("Автоповтор")
    .addStringOption((option) => option.setName('repeat_mode').setDescription('Режим автоповтора').setRequired(true)
    .addChoice('Очередь', 'queue')
    .addChoice('Трек', 'track')
    .addChoice('Выключить', 'delfilter')),
    
	run: async ({ client, interaction }) => {
        
        const queue = client.player.getQueue(interaction.guildId)

        let object = interaction.options._hoistedOptions[0].value
        
        const embed2 = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({embeds: [embed2], ephemeral: true})

        const embed = new MessageEmbed()
            .setTitle('RepeatMode активирован')
            .setDescription(`Режим автоповтор ${object} запущен`)

        const embed1 = new MessageEmbed()
            .setTitle('RepeatMode деактивирован')
            .setDescription(`Режим автоповтор выключен`)

        if(object === 'queue') {
            await queue.setRepeatMode(3);
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }
        if(object === 'track') {
            await queue.setRepeatMode(2);
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }

        if(object === 'delfilter'){
            await queue.setRepeatMode(1);
            await interaction.reply({
                embeds: [embed1], ephemeral: true
            })
        }
    }
}