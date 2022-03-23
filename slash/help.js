const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("help").setDescription("Помощь с командами бота"),
	run: async ({ client, interaction }) => {
        let embed = new MessageEmbed
        embed
            .setAuthor({name:`Список команд Бота`, iconURL: `${client.user.displayAvatarURL()}`})
            .setDescription("``/info - отображает информиацию о треке\n\n/skipto - пропустить трек до определенного(для пропуска треков очереди)\n\n/play - воиспроизвести трек\n\n/queue - очередь треков\n\n/pause - остановить трек\n\n/ouit - остановить бота\n\n/resume - возобновить трек\n\n/shuffle - перемешать треки в очереди\n\n/skip - пропустить трек\n\n/bassboost - навалить баса\n\n/repeat - автоповтор треков\n\n/volume - изменить громкость трека``")
        
        await interaction.reply({
            embeds: [embed], ephemeral: true
        })
    }
}