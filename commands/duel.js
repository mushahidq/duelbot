const { _, channelid } = require('../config.json')

module.exports = {
    name: 'duel',
    despcription: "Challenge a player to a duel",
    execute(message, args) {
        if(message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`${taggedUser}, you have been challenged to a duel by ${message.author}.\nReact with your response.`);
        }
        else {
            message.channel.send(`${message.author} You need to tag the user you want to challenge to a duel.`);
        }
    }
}