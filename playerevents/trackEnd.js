const client = require('../index').client

module.exports = async (queue, track, interaction) => {
    client.user.setActivity({
        name: '🎶 | Music Time',
        type: "PLAYING"
    });
}
