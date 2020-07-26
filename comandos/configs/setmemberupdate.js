const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

exports.run = async(bot, message, args) => {

    let canal = message.mentions.channels.first();
    if(!canal){
        return message.reply("Você precisar mencionar um canal!")
    }

    let set = new Discord.MessageEmbed()
    .setDescription("Foi setado com sucesso, o canal de Member Update!")
    message.reply(set)

    db.ref(`Configuração/MemberUpdate/${message.guild.id}/Canal`).set(canal.id)

}

exports.help = {
    name: 'setmemberupdate',
    aliases: ['memberupdate']
}
