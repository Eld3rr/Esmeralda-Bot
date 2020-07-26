const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
exports.run = async(bot, message, args) => {

    let prefix = args[0];
    if(!prefix){
        return message.reply("Digite o prefixo!")
    };

    let suc = new Discord.MessageEmbed()
    .setDescription(`Foi adicionado com sucesso o prefixo: \`${prefix}\``)
    message.channel.send(suc)
    
    db.ref(`Configuração/SetPrefix/${message.guild.id}/Prefixo`).set(prefix)

};

exports.help = {
    name: 'set-prefix',
    aliases: ['setprefix', 'setp']
}
