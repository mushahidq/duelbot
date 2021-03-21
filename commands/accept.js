const { prefix, channelid } = require('../config.json')
const fetch = require('node-fetch')
const querystring = require('querystring')

module.exports = {
    name: 'accept',
    despcription: "Accept someone's duel challenge",
    guildOnly: true,
    execute: async (message, args, quiz) => {
        if(quiz.duel && message.author.id == quiz.participant2.id) {
            message.channel.send(`${message.author} has accepted ${quiz.participant1}'s challenge.\nThe duel will begin in 10 seconds.\nThere will be three questions and first person to answer two correctly wins the duel.\nThe questions are of true/false type but you'll have to type out the entire sentence in the answer, for example "\`!first The statement.. is false.\`".\nUse \`${prefix}first\`, \`${prefix}second\` and \`${prefix}third\` to answer first second and third questions respectively.\nThe quiz will end automatically after 5 mins.`);
            quiz.isgoingon = true;
            const response = await fetch('https://opentdb.com/api.php?amount=3&type=boolean').then(response => response.json());
            var i = 0;
            message.channel.send('The statements are:');
            for (result of response.results) {
                quiz.questions[i] = result.question;
                if (result.correct_answer === 'True') {
                    quiz.answers[i] = querystring.stringify(result.question.slice(0, -1) + " is true.");
                } else if (result.correct_answer == 'False') {
                    quiz.answers[i] = querystring.stringify(result.question.slice(0, -1) + " is false.");
                }
                message.channel.send(`\n${quiz.questions[i]}`);
                i++;
            }
            console.log(quiz.answers);
        }
        else {
            message.channel.send(`${message.author} no one has challenged you to a duel as of now.`);
        }
        setTimeout(() => {
            if(quiz.scoreboard[0] == quiz.scoreboard[1]) {
                message.channel.send(`Both the participants scored ${quiz.scoreboard[0]} points.\nIt's a tie.`);
            } else if (quiz.scoreboard[0] > quiz.scoreboard[1]) {
                message.channel.send(`${quiz.participant1} has won this duel.\n${quiz.participant2} better luck next time.`)
            } else if (quiz.scoreboard[0] < quiz.scoreboard[1]) {
                message.channel.send(`${quiz.participant2} has won this duel.\n${quiz.participant1} better luck next time.`)
            }
            quiz.participant1 = '';
            quiz.participant2 = '';
            quiz.duel = false;
            quiz.isgoingon = false;
            quiz.questions = [];
            quiz.scoreboard = [0, 0];
            quiz.answered = [false, false, false];
        }, 300000)
    }
}