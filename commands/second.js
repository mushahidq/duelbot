module.exports ={
    name: 'second',
    despcription: "Respond to the second question",
    guildOnly: true,
    execute(message, args, quiz) {
        if(quiz.isgoingon) {
            if (message.author.id == quiz.participant1.id || message.author.id == quiz.participant2.id) {
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
            if (quiz.scoreboard[0] == 2) {
                message.channel.send(`${quiz.participant1} has won this duel.\n${quiz.participant2} better luck next time.`)
            } else if (quiz.scoreboard[1] == 2) {
                message.channel.send(`${quiz.participant2} has won this duel.\n${quiz.participant1} better luck next time.`)
            }
            quiz.participant1 = '';
            quiz.participant2 = '';
            quiz.duel = false;
            quiz.isgoingon = false;
            quiz.questions = [];
            quiz.scoreboard = [0, 0];
            quiz.answered = [false, false, false];
        }
        else {
            message.channel.send(`${message.author}, there is no ongoing duel.`);
        }
    }
}