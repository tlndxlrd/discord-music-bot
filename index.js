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
        "GUILD_VOICE_STATES",
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'GUILD_BANS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INVITES',
        'GUILD_PRESENCES'
    ]
});

client.slashcommands = new Discord.Collection();
client.events = new Discord.Collection();
client.hadlerButtons = new Discord.Collection();
client.command = new Discord.Collection();
client.aliases = new Discord.Collection();

module.exports.client = client

require("discord-player-tlndxlrd/smoothVolume");

const player = new Player(client, {
    spotifyBridge: false,
    ytdlOptions: {
        // requestOptions: {
        //     headers: {
        //         cookie: "YOUR_YOUTUBE_COOKIE"
        //     }
        // },
        highWaterMark: 1 << 25,
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

["events", "playerEvents", "hadlerButtons", "slashcommands", "command"].forEach(handler => {
    try {
        require(`./handlers/${handler}`)(client, player)
    } catch (e) {
        console.log(e)
    }
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.login(TOKEN);