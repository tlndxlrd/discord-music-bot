const client = require('../index').client

module.exports = async (queue, track) => {
    client.user.setActivity(client.user.username, { type: "PLAYING"});
}