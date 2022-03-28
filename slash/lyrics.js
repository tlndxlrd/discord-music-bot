const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const getLyrics = (title) =>
    new Promise(async (ful, rej) => {
        const url = new URL("https://some-random-api.ml/lyrics");
        url.searchParams.append("title", title);

        try {
            const { data } = await axios.get(url.href);
            ful(data);
        } catch (error) {
            rej(error);
        }
    });

const substring = (length, value) => {
    const replaced = value.replace(/\n/g, "--");
    const regex = `.{1,${length}}`;
    const lines = replaced
        .match(new RegExp(regex, "g"))
        .map((line) => line.replace(/--/g, "\n"));

    return lines;
};

const createResponse = async (title) => {
    try {
        const data = await getLyrics(title);

        const embeds = substring(4096, data.lyrics).map((value, index) => {
            const isFirst = index === 0;

            return new MessageEmbed({
                title: isFirst ? `${data.title} - ${data.author}` : null,
                thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
                description: value
            });
        });

        return { embeds };
    } catch (error) {
        return "Не могу найти текст этой песни :(";
    }
};

module.exports = {
    data: new SlashCommandBuilder().setName("lyrics")
    .setDescription("Отображает текст текущей песни или конкретного трека")
    .addStringOption((option) => option
        .setName("title")
        .setDescription("Название трека для текста").setRequired(false)),

    run: async (client, interaction) => {
        const title = interaction.options.getString("title");
        const sendLyrics = (songTitle) => {
            return createResponse(songTitle)
                .then((res) => {
                    console.log({ res });
                    interaction.reply(res);
                })
                .catch((err) => console.log({ err }));
        };

        if (title) return sendLyrics(title);

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        })
        const embed1 = new MessageEmbed()
        .setTitle('❌ |Ошибка')
        .setDescription('В настоящее время трек не воспроизводится')
        if (!queue?.playing)
            return interaction.reply({
                embeds: [embed1]
            });

        return sendLyrics(queue.current.title);
    }
};