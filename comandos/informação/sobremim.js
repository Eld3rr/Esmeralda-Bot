const Discord = require("discord.js");
const firebase = require("firebase")
const db = firebase.database();
exports.run = async(bot, message, args) => {

    let desc = args.slice(0).join(" ");
    if(!desc) return message.reply("Você não especificou a sua Descrição!")

    let succ = new Discord.MessageEmbed()
    .setDescription("Foi setado com sucesso, sua Biografia!")
    message.channel.send(succ)
    
    db.ref(`Perfil/User/${message.author.id}/Descrição`).set(desc);
}

exports.help = {
    name: 'sobre-mim',
    aliases: ['sobremim', 'descrição', 'descricao', 'desc', 'description']
}
