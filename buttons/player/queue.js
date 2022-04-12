const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: {
        name: 'queue'
    },

    run: async (client, interaction, player) => {

        interaction.deferReply({ ephemeral: true })
        
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('back')
                .setLabel('⬅️ Назад')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('next')
                .setLabel('➡️ Вперед')
                .setStyle(`PRIMARY`),
        )

        const queue = player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription('В очереди нет треков')

        if (!queue || !queue.playing) {
            return await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1

        let currentPage = 0

        let page = 0 + currentPage

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

        let myButtonMsg = await interaction.channel.send({ embeds: [embed], components: [row] })

        const collector = myButtonMsg.createMessageComponentCollector(async (button) => button.clicker.customId === interaction.customId, { time: 1000 * 1000 * 60 })

        collector.on('collect', async (b) => {
            console.log(b.customId)
            if (b.customId === 'next') {

                await b.deferReply({ ephemeral: true })

                embed
                    .setTitle('❌ |Неверная страница')
                    .setDescription(`Страницы кончились`)

                if (page > totalPages - 2) {
                    return await b.editReply({ embeds: [embed], ephemeral: true })
                }

                currentPage = + 1
                page = page + currentPage

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

                await myButtonMsg.edit({ embeds: [embed], components: [row] })
            }

            if (b.customId === 'back') {

                await b.deferReply({ ephemeral: true })

                embed
                    .setTitle('❌ |Неверная страница')
                    .setDescription(`Вы на первой странице`)

                if (page < 1) {
                    return await b.editReply({ embeds: [embed], ephemeral: true })
                }

                currentPage = 1
                page = page - currentPage

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

                await myButtonMsg.edit({ embeds: [embed], components: [row] })
            }
        })
    }
}