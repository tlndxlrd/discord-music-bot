
module.exports = (client, interaction )=> {
    async function handleCommand() {
        
        let slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) {
            await interaction.reply("Not a valid slash command")
        }
        
        slashcmd.run(client, interaction)
    }
    handleCommand()
}

