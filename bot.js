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
    if(msg.channel.id == channelid) {
        if(!client.commands.has(command)){
            return msg.channel.send(`${command} command not found\nUse \`!help\` for help`);
        }

        try {
            client.commands.get(command).execute(msg, args);
        } catch(error) {
            console.error(error);
            msg.channel.send('there was an error trying to execute that command!');
        }
    }
}

client.login(process.env.TOKEN)