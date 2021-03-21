require("dotenv").config()
const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, channelid, funtranslations } = require('./config.json')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var quiz = {
    duel: false,
    isgoingon: false,
    participant1: "",
    participant2: "",
    questions: [],
    answers: [],
    scoreboard: [0, 0],
    answered: [false, false, false]
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", gotMessage)

function gotMessage(msg) {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if(msg.channel.id == channelid || msg.channel.id == funtranslations) {
        if(!client.commands.has(commandName)){
            return msg.channel.send(`${commandName} command not found\nUse \`!help\` for help`);
        }

        const command = client.commands.get(commandName);
        try {
            command.execute(msg, args, quiz);
        } catch(error) {
            console.error(error);
            msg.channel.send('there was an error trying to execute that command!');
        }
    }
}

client.login(process.env.TOKEN)