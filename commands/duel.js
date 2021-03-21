const { prefix, channelid } = require('../config.json')

module.exports = {
    name: 'duel',
    despcription: "Challenge a player to a duel",
    guildOnly: true,
    execute(message, args, quiz) {
        if(message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`${taggedUser}, you have been challenged to a duel of wits by ${message.author}.\nRespond with \`${prefix}accept\` in the next five minutes to accept the challenge or with \`${prefix}reject\` to reject the challenge.`);
            quiz.participant1 = message.author;
            quiz.duel = true;
            quiz.participant2 = taggedUser;
            setTimeout(() => {
                if(quiz.duel && !quiz.isgoingon) {
                    message.channel.send(`${taggedUser} has not accepted the challenge in the required time`);
                    quiz.participant1 = '';
                    quiz.participant2 = '';
                    quiz.duel = '';
                }
            }, 300000)
        }
        else {
            message.channel.send(`${message.author} You need to tag the user you want to challenge to a duel.`);
        }
    }
}