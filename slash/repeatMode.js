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
        
        let embed = new MessageEmbed()

        embed
		    .setTitle('Ошибка')
		    .setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

        if(object === 'queue') {
            embed
                .setTitle('RepeatMode активирован')
                .setDescription(`Режим автоповтор ${object} запущен`)

            await queue.setRepeatMode(3);
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }
        if(object === 'track') {
            embed
                .setTitle('RepeatMode активирован')
                .setDescription(`Режим автоповтор ${object} запущен`)
            await queue.setRepeatMode(2);
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }

        if(object === 'delfilter'){
            embed
                .setTitle('RepeatMode деактивирован')
                .setDescription(`Режим автоповтор выключен`)
            await queue.setRepeatMode(1);
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }
    }
}