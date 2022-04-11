const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder().setName("bassboost").setDescription("Фильтр усилиение басов")
        .addStringOption((option) => option.setName('boost').setDescription('Режим усиления').setRequired(true)
            .addChoice('Слегка усилить', 'bassboost_low')
            .addChoice('Среддне усилить', 'bassboost')
            .addChoice('Сильно усилить', 'bassboost_high')
            .addChoice('Выключить фильтр', 'delfilter')),

    run: async (client, interaction, player) => {

        const queue = player.getQueue(interaction.guildId)

        let object = interaction.options._hoistedOptions[0].value

        const embed2 = new MessageEmbed()
            .setTitle('❌ |Ошибка')
            .setDescription('В настоящее время трек не воспроизводится')

        if (!queue) return await interaction.reply({ embeds: [embed2], ephemeral: true })

        const embed = new MessageEmbed()
            .setTitle('✅ |Режим bassboost активирован')
            .setDescription(`${object} запущен`)

        const embed1 = new MessageEmbed()
            .setTitle('✅ |Режим bassboost деактивирован')
            .setDescription(`Все фильтры выключены`)

        if (object === 'bassboost_low') {
            await queue.setFilters({ bassboost_low: true });
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }
        if (object === 'bassboost') {
            await queue.setFilters({ bassboost: true });
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }
        if (object === 'bassboost_high') {
            await queue.setFilters({ bassboost_high: true });
            await interaction.reply({
                embeds: [embed], ephemeral: true
            })
        }

        if (object === 'delfilter') {
            await queue.setFilters({ bassboost_low: false });
            await queue.setFilters({ bassboost: false });
            await queue.setFilters({ bassboost_high: false });
            await interaction.reply({
                embeds: [embed1], ephemeral: true
            })
        }
    }
}