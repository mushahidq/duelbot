const { _, channelid } = require('../config.json')
const querystring = require('querystring')
const fetch = require('node-fetch')

module.exports = {
    name: 'pirate-translate',
    description: 'Translates a string to how Yoda would say it',
    execute: async(message, args) =>{
        if (!args.length) {
            return message.channel.send("You need to specify some text to convert");
        }
        const query = querystring.stringify({ term: args.join(' ') });
        const { _, content } = await fetch(`https://api.funtranslations.com/translate/pirate.json?text=${query}`).then(response => response.json());
        message.channel.send(content.translated).catch(error => {
            console.log(error);
        });
    }
}