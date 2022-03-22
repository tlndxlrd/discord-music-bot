const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")


module.exports = {
	data: new SlashCommandBuilder().setName("bassboost").setDescription("Фильтр усилиение басов")
    .addStringOption((option) => option.setName('boost').setDescription('Режим усиления').setRequired(true)
    .addChoice('Слегка усилить', 'bassboost_low')
    .addChoice('Среддне усилить', 'bassboost')
    .addChoice('Сильно усилить', 'bassboost_high')
    .addChoice('Выключить фильтр', 'delfilter')),
    
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
                .setTitle('Режим bassboost активирован')
                .setDescription(`${object} запущен`)

        let embed1 = new MessageEmbed
            embed1
                .setTitle('Режим bassboost деактивирован')
                .setDescription(`Все фильтры выключены`)

        if(object === 'bassboost_low') {
            await queue.setFilters({bassboost_low: true});
            await interaction.editReply({
                embeds: [embed]
            })
        }
        if(object === 'bassboost') {
            await queue.setFilters({bassboost: true});
            await interaction.editReply({
                embeds: [embed]
            })
        }
        if(object === 'bassboost_high') {
            await queue.setFilters({bassboost_high: true});
            await interaction.editReply({
                embeds: [embed]
            })
        }
        //console.log(queue._activeFilters)
        if(object === 'delfilter'){
            await queue.setFilters({bassboost_low: false});
            await queue.setFilters({bassboost: false});
            await queue.setFilters({bassboost_high: false});
            await interaction.editReply({
                embeds: [embed1]
            })
        }
    }
}