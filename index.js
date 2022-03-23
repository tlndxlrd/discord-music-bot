const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")

dotenv.config()
const TOKEN = process.env.TOKEN
const SPOTIFY_TOKEN = process.env.SPOTIFY_TOKEN
const SPOTIFY_ID = process.env.SPOTIFY_ID

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
})

const {DisTube} = require('distube')
const {SpotifyPlugin} = require('@distube/spotify')
client.slashcommands = new Discord.Collection()

client.player = new Player(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(
        {
            parallel: true,
            emitEventsAfterFetching: false,
            api: {
              clientId: SPOTIFY_ID,
              clientSecret: SPOTIFY_TOKEN,
            },
          
    })],
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
module.exports = client

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

const filterFiles = fs.readdirSync("./Filter").filter(file => file.endsWith(".js"))
for (const file of filterFiles){
    const slashcmd = require(`./Filter/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}
if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            
            let slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) {
                await interaction.reply("Not a valid slash command")
            }
            
            slashcmd.run({ client, interaction })
        }
        handleCommand()
    })

    process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

    client.login(TOKEN)
}