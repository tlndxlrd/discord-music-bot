const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Commands", "Load status");
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const {readdirSync} = require('fs');
const TOKEN = process.env.TOKEN
const LOAD_SLASH = process.argv[2] == "load"
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
let commands = [];
const allevents = [];

module.exports = async (client) => {
    try {
        const slashFiles = readdirSync(`./slash`).filter((file) => file.endsWith(".js"));
        for (let file of slashFiles) {
            const slashcmd = require(`../slash/${file}`)
            let eventName = file.split(".")[0];
            allevents.push(eventName);
            client.slashcommands.set(slashcmd.data.name, slashcmd)
            if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
        }
        dotenv.config()

        if (LOAD_SLASH) {
            const rest = new REST({ version: "9" }).setToken(TOKEN)
            console.log("Deploying slash commands")
            rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
                .then(() => {
                    console.log("Successfully loaded")
                    process.exit(0)
                })
                .catch((err) => {
                    if (err) {
                        console.log(err)
                        process.exit(1)
                    }
                })
        }
        for (let i = 0; i < allevents.length; i++) {
            try {
                table.addRow(allevents[i], "Ready");
            } catch (e) {
                console.log(String(e.stack).red);
            }
        }
        console.log(table.toString().cyan);
    } catch (e) {
        console.log(e)
    }
}