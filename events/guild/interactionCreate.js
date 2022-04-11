const { MessageEmbed } = require("discord.js")
const player = require('../../index').player

module.exports = async (client, interaction) => {

    let embed = new MessageEmbed();

    if (interaction.isCommand()) {

        let slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) {
            embed
                .setTitle('❌ |Ошибка')
                .setDescription("Недопустимая команда")
            return await interaction.reply({embeds: [embed]})
        }
        try {
            slashcmd.run(client, interaction, player)
        } catch (e) {
            console.log(e)
        }
    }

    if (interaction.isButton()) {
        let button = client.hadlerButtons.get(interaction.customId)
        if (!button) {
            embed
                .setTitle('❌ |Ошибка')
                .setDescription("Недопустимая кнопка")
            return await interaction.reply({embeds: [embed]})
        }
        try {
            await button.run(client, interaction, player)
        } catch (e) {
            console.log(e)
        }
    }
}

