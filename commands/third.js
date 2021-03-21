module.exports ={
    name: 'thirs',
    despcription: "Respond to the third question",
    guildOnly: true,
    execute(message, args, quiz) {
        if(quiz.isgoingon) {
            if (message.author.id == quiz.participant1.id || message.author.id == quiz.participant2.id) {
                const answer = args.join(' ');
                if (answer == quiz.answers[2] && !quiz.answered[2]){
                    if (message.author == quiz.particpant1) {
                        quiz.scoreboard[0] += 1;
                    } else if (message.author == quiz.particpant2) {
                        quiz.scoreboard[1] += 1;
                    }
                    message.channel.send(`${message.author} gets 1 point for the correct answer.`);
                }
                else {
                    message.channel.send(`${message.author} that answer is wrong or that question has already been answered.`);
                }
            }
        }
        else {
            message.channel.send(`${message.author}, there is no ongoing duel.`);
        }
    }
}