const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Воспроизводит треки с youtube или spotify")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song_playlist_search")
				.setDescription("Воспроизводит трек или плейлист из youtube или spotify")
				.addStringOption((option) => option.setName("url").setDescription("Ссылка на трек или плейлист").setRequired(true))
		),
    run: async ({ client, interaction }) => {

        await interaction.deferReply({ ephemeral: true })

        let embed = new MessageEmbed()

        embed
            .setTitle('Ошибка')
            .setDescription("Присоеденитесь к голосовому каналу и опробуйте снова")

        if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [embed] })

        const queue = await client.player.createQueue(interaction.guild)

        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        if (interaction.options.getSubcommand() === "song_playlist_search") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            console.log(result.tracks.length)
            if (result.tracks.length === 0) {
                embed
                    .setTitle('Ошибка')
                    .setDescription("Не найдено")
                return interaction.editReply({ embeds: [embed] })
            }
            const playlist = result.playlist
            if (playlist) {
                try {
                    await queue.addTracks(result.tracks)
                    embed
                        .setTitle('Выполнено')
                        .setDescription(`**${result.tracks.length} треков с плейлиста [${playlist.title}](${playlist.url})** добавлены в очередь`)
                        .setThumbnail(playlist.thumbnail)
                } catch (e) {
                    console.log(e)
                }
            }

            const song = result.tracks[0]
            if (song) {
                try {
                    await queue.addTrack(song)
                    embed
                        .setTitle('Выполнено')
                        .setDescription(`**[${song.author} - ${song.title}](${song.url})** трек добавлен в очередь`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Дата: ${song.duration}` })
                } catch (e) {
                    console.log(e)
                }
            }
        }

        if (!queue.playing) await queue.play()

        await interaction.channel.send({
            embeds: [embed]
        })
    },
}