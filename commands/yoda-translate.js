const { _, channelid } = require('../config.json')
const querystring = require('querystring')

module.exports = {
    name: 'yoda-translate',
    description: 'Translates a string to how Yoda would say it',
    execute: async(message, args) =>{
        if (message.channel.id == channelid) {
            if (!args.length) {
                return message.channel.send("You need to specify some text to convert");
            }
            const query = querystring.stringify({ term: args.join(' ') });
            const { _, content } = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${query}`);
            message.channel.send(content.translated);
        }
    }
}