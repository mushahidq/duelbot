const { prefix, channelid } = require('../config.json')

module.exports = {
    name: 'reject',
    despcription: "Reject someone's duel challenge",
    guildOnly: true,
    execute(message, args, quiz) {
        if(quiz.duel == true) {
            message.channel.send(`${message.author}, this will reflect badly on you.`);
        }
        else {
            message.channel.send(`${message.author} no one has challenged you to a duel as of now.`);
        }
    }
}