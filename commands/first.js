module.exports ={
    name: 'first',
    despcription: "Respond to the first question",
    guildOnly: true,
    execute(message, args, quiz) {
        if(quiz.isgoingon) {
            if (true) {//message.author == quiz.particpant1 || message.author == quiz.particpant2) {
                const answer = args.join(' ');
                if (answer == quiz.answers[0] && !quiz.answered[0]){
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