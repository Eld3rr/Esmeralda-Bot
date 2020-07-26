const Discord = require("discord.js");

exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        let per = new Discord.MessageEmbed()
        .setDescription("Você necessita da permissão **MANAGE_MESSAGES**")
        return message.channel.send(per)
    };
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        let per2 = new Discord.MessageEmbed()
        .setDescription("Eu preciso da permissão **MANAGE_MESSAGES**")
        return message.channel.send(per2)
    };
    if(!args[0]){
        let arg = new Discord.MessageEmbed()
        .setDescription("Use: e!clear 10")
        return message.channel.send(arg)
    };

    message.channel.bulkDelete(args[0]).then(() => {
        let limpei = new Discord.MessageEmbed()
        .setDescription(`Limpei \`${args[0]}\` mensagens!`)
        message.channel.send(limpei)
    });

}

exports.help = {
    name: 'clear',
    aliases: ['limpar', 'limparchat', 'limparc']
}
