const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")
const colors = require('colors')
const {readdirSync} = require('fs')


dotenv.config()
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
})

client.slashcommands = new Discord.Collection()
client.events = new Discord.Collection();


module.exports.client = client

require("discord-player/smoothVolume");

const player = client.player = new Player(client, {
    bufferingTimeout: 1000,
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

player.playerEvents = new Discord.Collection();
module.exports.player = player

var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

let commands = []

    const slashFiles = readdirSync(`./slash`).filter((file) => file.endsWith(".js"));
    for (let file of slashFiles) {
        const slashcmd = require(`./slash/${file}`)
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

["events"].forEach(handler => {
    try {
        require(`./handlers/${handler}`)(client)
    } catch (e) {
        console.log(e)
    }
});

["playerEvents"].forEach(playerHandler => {
    try {
        require(`./playerHandler/${playerHandler}`)(player)
    } catch (e) {
        console.log(e)
    }
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.login(TOKEN)
