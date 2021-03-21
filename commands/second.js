module.exports ={
    name: 'second',
    despcription: "Respond to the second question",
    guildOnly: true,
    execute(message, args, quiz) {
        if(quiz.isgoingon) {
            if (message.author.id == quiz.particpant1.id || message.author.id == quiz.particpant2.id) {
                const answer = args.join(' ');
                if (answer == quiz.answers[1] && !quiz.answered[1]){
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