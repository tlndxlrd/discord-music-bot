const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Отображает текущую очередь треков")
        .addNumberOption((option) => option.setName("page").setDescription("Cтраницы очереди треков").setMinValue(1)),

    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В очереди нет треков')

        if (!queue || !queue.playing) {
            return await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1

        const page = (interaction.options.getNumber("page") || 1) - 1

        embed
            .setTitle('❌ |Неверная страница')
            .setDescription(`Всего есть только ${totalPages} страниц с треками`)

        if (page > totalPages) {
            return await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[🕞 |${song.duration}]\` ${song.author} - ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        embed
            .setTitle('✅ |Выполнено')
            .setDescription(`🎶 |**Сейчас играет**\n` +
                (currentSong ? `\`[🕞 |${currentSong.duration}]\` ${currentSong.author}  - ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                `\n\n**Очередь**\n${queueString}`
            )
            .setFooter({
                text: `Страница ${page + 1} из ${totalPages}`
            })
            .setThumbnail(currentSong.setThumbnail)

        await interaction.reply({
            embeds: [embed], ephemeral: true
        })
    }
}