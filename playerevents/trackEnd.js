const client = require('../index').client

module.exports = async (queue, track) => {
    client.user.setActivity({
        name: '🎶 | Music Time',
        type: "PLAYING"});
}