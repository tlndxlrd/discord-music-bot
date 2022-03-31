module.exports = async (client, interaction) => {
    async function handleCommand() {

        let slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) {
            await interaction.reply("Not a valid slash command")
        }

        slashcmd.run(client, interaction)
    }
    if (interaction.isCommand()) handleCommand()

    if (interaction.isButton()) {
        let button = client.hadlerButtons.get(interaction.customId)
        if (!button) return await interaction.reply('gg')
        try {
            await button.run(client, interaction)
        } catch (e) {
            console.log(e)
        }
    }
}

