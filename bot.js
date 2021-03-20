require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, channelid } = require('./config.json')

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", gotMessage)

function gotMessage(msg) {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (msg.channel.id == channelid && command === "ping") {
        msg.channel.send("Pong");
    } else if (msg.channel.id == channelid && command === "beep") {
        msg.channel.send("Boop");
    } else if (msg.channel.id == channelid && command === "server") {
        msg.channel.send(`This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
    } else if (msg.channel.id == channelid && command === "user-info") {
        msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
    } else if (msg.channel.id == channelid && command === "args-info") {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
    } else if (msg.channel.id == channelid && command === "duel") {
        if(msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`${taggedUser}, you have been challenged to a duel by ${msg.author}.\nReact with your response.`);
        }
        else {
            msg.channel.send(`${msg.author} You need to tag the user you want to challenge to a duel.`);
        }
    }
}

client.login(process.env.TOKEN)