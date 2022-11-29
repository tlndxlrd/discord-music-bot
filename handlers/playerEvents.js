const fs = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Player");
table.setHeading("Events", "Load status");
const allevents = [];

module.exports = async (player) => {
  try {
    const event_files = fs.readdirSync(`./playerevents/`).filter((file) => file.endsWith(".js"));
    for (const file of event_files) {
      const event = require(`../playerevents/${file}`)
      let eventName = file.split(".")[0];
      allevents.push(eventName);
      player.on(eventName, event.bind(null));
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