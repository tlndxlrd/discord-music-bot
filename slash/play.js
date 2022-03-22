const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Воспроизводит треки с youtube или spotify")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Воспроизводит трек из youtube или spotify")
				.addStringOption((option) => option.setName("url").setDescription("Ссылка на трек").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Воспроизводит плейлист с spotify")
				.addStringOption((option) => option.setName("url").setDescription("Ссылка на плейлист").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Ищет трек по названию")
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("Напишите название трека").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {

		if (!interaction.member.voice.channel) return interaction.editReply("Присоеденитесь к голосовому каналу и опробуйте снова")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: 14
            })

            const resultSpotify = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: 6,
            })
            
            // await client.player.search(url, {
            //     requestedBy: interaction.user,
            //     searchEngine: 14
            // })
            if (result.tracks.length + resultSpotify.tracks.length === 0) {
                return interaction.editReply("Не найдено")
            }
            
            if(result.tracks.length === 1) {
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** трек добавлен в очередь`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Дата: ${song.duration}`})
            }

            if(resultSpotify.tracks.length === 1) {
                const song = resultSpotify.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** трек добавлен в очередь`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Дата: ${song.duration}`})
            }

		} else if (interaction.options.getSubcommand() === "playlist") {
            try{
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.SPOTIFY_PLAYLIST,
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Не найдено")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} треков с плейлиста [${playlist.title}](${playlist.url})** добавлены в очередь`)
                .setThumbnail(playlist.thumbnail)
        }catch (e) {
            return interaction.editReply("Неизвестная ошибка")
        }
		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Не найдено")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** трек добавлен в очередь`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Дата: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}