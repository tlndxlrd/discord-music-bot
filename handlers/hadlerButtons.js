const client = require('../index').client
const fs = require('fs');

module.exports = async () => {
    const buttonsFolders = fs.readdirSync('./buttons/')
    for (const folder of buttonsFolders) {
        const buttonsFiles = fs.readdirSync(`./buttons/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of buttonsFiles) {
            const button = require(`../buttons/${folder}/${file}`)
            let buttonName = file.split(".")[0];
            client.hadlerButtons.set(buttonName, button);
        }
    }
}