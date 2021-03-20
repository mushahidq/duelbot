const { _, channelid } = require('../config.json')

module.exports = {
    name: 'user-info',
    description: "Gives the information about the user",
    execute: async(message, args) => {
        if (message.channel.id == channelid) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
        }
    }
}