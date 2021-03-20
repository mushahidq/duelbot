require("dotenv").config()
const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, channelid } = require('./config.json')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

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
    const command = args.shift().toLowerCase();
    if (msg.channel.id == channelid && command === "user-info") {
        client.commands.get('user-info').execute(msg, args);
    } else if (msg.channel.id == channelid && command === "help") {
        client.commands.get('help').execute(msg, args);
    } else if (msg.channel.id == channelid && command === "duel") {
        client.commands.get('duel').execute(msg, args);
    } else if (msg.channel.id == channelid && command === "yoda-translate") {
        client.commands.get('yoda-translate').execute(msg, args);
    } else if (msg.channel.id == channelid && command === "pirate-translate") {
        client.commands.get('pirate-translate').execute(msg, args);
    } else if (msg.channel.id == channelid && command === "shakespeare-translate") {
        client.commands.get('shakespeare-translate').execute(msg, args);
    }
}

client.login(process.env.TOKEN)