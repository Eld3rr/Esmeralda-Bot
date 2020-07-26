const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

exports.run = async(bot, message, args) => {

    let embed1 = new Discord.MessageEmbed()
    .setTitle("Language / Idioma")
    .setDescription("Reaja ao emoji de acordo com o seu idioma.\nReact to the emoji according to your language.")
    .addField("馃嚙馃嚪 Brazil/Brasil", 'Para setar como idioma Brasil!\nFor set how language Brazil!')
    .addField("馃嚭馃嚫 English/Ingl锚s", 'For set with language English!\nPara setar como idioma Ingl锚s!')

    message.channel.send(embed1).then(msg => {
        msg.react('馃嚙馃嚪')
        msg.react('馃嚭馃嚫')

           const PortuguesFilter = (reaction, user) => reaction.emoji.name === "馃嚙馃嚪" && user.id === message.author.id
           const InglesFilter = (reaction, user) => reaction.emoji.name === "馃嚭馃嚫" && user.id === message.author.id;
      
           const Portugues = msg.createReactionCollector(PortuguesFilter)
           const Ingles = msg.createReactionCollector(InglesFilter)

    Portugues.on("collect", r2 => {
        let port1 = new Discord.MessageEmbed()
        .setTitle("馃嚙馃嚪 Idioma Setado!")
        .setDescription("馃嚙馃嚪 O idioma setado foi o Portugu锚s de Brasil.")

        msg.reactions.removeAll()
        msg.edit(port1)
        db.ref(`Configura莽茫o/SetIdioma/${message.author.id}`).set('Pt-Br')
    })

    Ingles.on("collect", r2 => {
        let ingl1 = new Discord.MessageEmbed()
        .setTitle("馃嚭馃嚫 Language Set!")
        .setDescription("馃嚭馃嚫 The language was set for the English.")

        db.ref(`Configura莽茫o/SetIdioma/${message.author.id}`).set('En-Us')
        msg.reactions.removeAll()
        msg.edit(ingl1)
    })
    })
  
};

exports.help = {
    name: 'setidioma',
    aliases: ['setlanguage']
}
