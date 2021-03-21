const { prefix, _ } = require('../config.json')

module.exports ={
    name: 'help',
    description: 'List all of the commands or info about a specific command.',
    usage: '[command name]',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if(!args.length) {
            data.push('Here\'s a list of all the commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nUse ${prefix}help [command name] to get info about a specific command.`);
            
            return message.channel.send(data);
        }
        
        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if(!command) {
            return message.channel.send(`${name} command does not exist.`)
        }
        data.push(`**Name:** ${command.name}`);

        if(command.description) data.push(`**Description:** ${command.description}`);
        if(command.usage) data.push(`**Usage:** ${prefix}${command.usage}`);

        message.channel.send(data, { split: true });
    }
}