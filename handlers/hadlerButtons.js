const fs = require('fs');

module.exports = async (client) => {
    const buttonsFolders = fs.readdirSync('./buttons/')
    for (const folder of buttonsFolders) {
        const buttonsFiles = fs.readdirSync(`./buttons/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of buttonsFiles) {
            const button = require(`../buttons/${folder}/${file}`)
            client.hadlerButtons.set(button.data.name, button);
        }
    }
}