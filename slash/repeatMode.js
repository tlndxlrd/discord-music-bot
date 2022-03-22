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
        
        let embed2 = new MessageEmbed
		embed2
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

		if (!queue) return await interaction.editReply({embeds: [embed2]})

        let embed = new MessageEmbed
            embed
                .setTitle('RepeatMode активирован')
                .setDescription(`Режим автоповтор ${object} запущен`)

        let embed1 = new MessageEmbed
            embed1
                .setTitle('RepeatMode деактивирован')
                .setDescription(`Режим автоповтор выключен`)

        if(object === 'queue') {
            await queue.setRepeatMode(3);
            await interaction.editReply({
                embeds: [embed]
            })
        }
        if(object === 'track') {
            await queue.setRepeatMode(2);
            await interaction.editReply({
                embeds: [embed]
            })
        }

        if(object === 'delfilter'){
            await queue.setRepeatMode(1);
            await interaction.editReply({
                embeds: [embed1]
            })
        }
    }
}