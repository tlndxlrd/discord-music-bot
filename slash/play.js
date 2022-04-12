const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player-tlndxlrd")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Воспроизводит трек или плейлист из youtube или spotify")
        .addStringOption((option) => option.setName("url_name").setDescription("Ссылка/название на трек или плейлист").setRequired(true)
        ),
    run: async (client, interaction, player) => {

        await interaction.deferReply({ ephemeral: true })

        let embed = new MessageEmbed()

        embed
            .setTitle('❌ |Ошибка')
            .setDescription("Присоеденитесь к голосовому каналу и попробуйте снова")

        if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [embed] })

        const queue = await player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        })

        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        let url = interaction.options.getString("url_name")
        const result = await player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (result.tracks.length === 0) {
            embed
                .setTitle('❌ |Ошибка')
                .setDescription("Не найдено")
            return interaction.editReply({ embeds: [embed] })
        }

        const playlist = result.playlist
        const song = result.tracks[0]
        if (playlist) {
            if (result.tracks.length > 50) {
                embed
                    .setTitle('❌ |Ошибка')
                    .setDescription("Нельзя добавить более 50 треков")
                return interaction.editReply({ embeds: [embed] })
            }
            try {
                await queue.addTracks(result.tracks)
                embed
                    .setTitle('✅ |Выполнено')
                    .setDescription(`🎶 |**${result.tracks.length} треков с плейлиста [${playlist.title}](${playlist.url})** добавлены в очередь`)
                    .setThumbnail(playlist.thumbnail)

                if (!queue.playing) { await queue.play() }

                return await interaction.channel.send({
                    embeds: [embed]
                })
            } catch (e) {
                console.log(e)
            }
        }

        if (queue.previousTracks[0]) {
            const track = result.tracks[0]
            await queue.addTrack(track)

            embed
                .setTitle('✅ |Выполнено')
                .setThumbnail(track.thumbnail)
                .setDescription(`🎶 |Трек добавлен в очередь [${track.author} - ${track.title}](${track.url})`)
                .setFooter({ text: `🕞 |Длительность ${track.duration}` })

            if (!queue.playing) await queue.play()

            return await interaction.channel.send({
                embeds: [embed]
            })
        }

        if (song) {
            try {
                await queue.addTrack(song)
                if (!queue.playing) await queue.play();
                return

            } catch (e) {
                console.log(e)
            }
        }

        if (!queue.playing) await queue.play()

        await interaction.channel.send({
            embeds: [embed]
        })
    },
}