const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Commands", "Load status");
const { readdirSync } = require('fs');
const allevents = [];

module.exports = async (client) => {

    try {
        const slashFiles = readdirSync(`./command`).filter((file) => file.endsWith(".js"));
        for (let file of slashFiles) {
            const command = require(`../command/${file}`)
            let eventName = file.split(".")[0];
            allevents.push(eventName);
            if (command.data) {
                table.addRow(eventName, "Ready");
            } else {
                table.addRow(eventName, `error->missing a data.name,or data.name is not a string.`);
                continue;
            }
            client.command.set(command.data.name, command)

            if (command.data.aliases && Array.isArray(command.data.aliases)) command.data.aliases.forEach((alias) => client.aliases.set(alias, command.data.name));
        }
        console.log(table.toString().cyan);
    } catch (e) {
        console.log(e)
    }
}