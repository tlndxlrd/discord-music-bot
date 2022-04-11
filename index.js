const Discord = require("discord.js")
const dotenv = require("dotenv")
const fs = require("fs")
const { Player } = require("discord-player-tlndxlrd")
const colors = require('colors')

dotenv.config()
const TOKEN = process.env.TOKEN

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
});

client.slashcommands = new Discord.Collection();
client.events = new Discord.Collection();
client.hadlerButtons = new Discord.Collection();

module.exports.client = client

require("discord-player-tlndxlrd/smoothVolume");

const player = new Player(client, {
    spotifyBridge: false,
    ytdlOptions: {
        highWaterMark: 1024*1024*60,
        quality: "highestaudio"

    }
});

player.playerEvents = new Discord.Collection();
module.exports.player = player

var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

["events", "playerEvents", "hadlerButtons", "slashcommands"].forEach(handler => {
    try {
        require(`./handlers/${handler}`)(client, player)
    } catch (e) {
        console.log(e)
    }
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.login(TOKEN);