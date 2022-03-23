const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Отображает текущую очередь треков")
    .addNumberOption((option) => option.setName("page").setDescription("Cтраницы очереди треков").setMinValue(1)),

    run: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guildId)

        const embed = new MessageEmbed()
		.setTitle('Ошибка')
		.setDescription('В очереди нет треков')

        if (!queue || !queue.playing) {
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1

        const page = (interaction.options.getNumber("page") || 1) - 1

        const embed1 = new MessageEmbed()
		.setTitle('Неверная страница')
		.setDescription(`Всего есть только ${totalPages} страниц с треками`)

        if (page > totalPages) {
            return await interaction.reply({embeds: [embed1], ephemeral: true})
        }
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`**Сейчас играет**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Очередь**\n${queueString}`
                    )
                    .setFooter({
                        text: `Страница ${page + 1} из ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ], ephemeral: true
        })
    }
}