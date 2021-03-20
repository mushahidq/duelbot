const { _, channelid } = require('../config.json')
const querystring = require('querystring')
const fetch = require('node-fetch')

module.exports = {
    name: 'yoda-translate',
    description: 'Translates a string to how Yoda would say it',
    execute: async(message, args) =>{
        if (!args.length) {
            return message.channel.send("You need to specify some text to convert");
        }
        const query = querystring.stringify({ term: args.join(' ') });
        const res = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${query}`).then(response => response.json());
        if(!res.content){
            console.log(res);
            return message.channel.send('there was an error trying to execute that command!');
        }
        message.channel.send(res.content.translated);
    }
}