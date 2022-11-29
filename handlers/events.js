const fs = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Client");
table.setHeading("Events", "Load status");
const allevents = [];
const MONGO_DB = process.env.MONGO_DB

module.exports = async (client) => {
  try {
    const load_dir = (dir) => {
      const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
      for (const file of event_files) {
        const event = require(`../events/${dir}/${file}`)
        let eventName = file.split(".")[0];
        allevents.push(eventName);
        client.on(eventName, event.bind(null, client));
      }
    }
    await ["client", "guild"].forEach(e => load_dir(e));
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
  
  const mongoose = require('mongoose')

  mongoose.connect(MONGO_DB);
  try {
    const stringlength3 = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength3 - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `                     MongoDB has Started`.bold.brightGreen + " ".repeat(-1 + stringlength3 - ` ┃ `.length - `                     MongoDB has Started`.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength3 - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }
  catch (e) {
    console.log(String(e.stack).bgRed)
  }
}