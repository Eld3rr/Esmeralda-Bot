const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

exports.run = async(bot, message, args) => {

    let embed1 = new Discord.MessageEmbed()
    .setTitle("Language / Idioma")
    .setDescription("Reaja ao emoji de acordo com o seu idioma.\nReact to the emoji according to your language.")
    .addField("🇧🇷| Brazil/Brasil", 'Para setar como idioma Brasil!\nFor set how language Brazil!')
    .addField("🇺🇸| English/Inglês", 'For set with language English!\nPara setar como idioma Inglês!')

    message.channel.send(embed1).then(msg => {
        msg.react('🇧🇷')
        msg.react('🇺🇸')

           const PortuguesFilter = (reaction, user) => reaction.emoji.name === "🇧🇷" && user.id === message.author.id
           const InglesFilter = (reaction, user) => reaction.emoji.name === "🇺🇸" && user.id === message.author.id;
      
           const Portugues = msg.createReactionCollector(PortuguesFilter)
           const Ingles = msg.createReactionCollector(InglesFilter)

    Portugues.on("collect", r2 => {
        let port1 = new Discord.MessageEmbed()
        .setTitle("🇧🇷| Idioma Setado!")
        .setDescription("O idioma setado foi o Português de Brasil.")

        msg.reactions.removeAll()
        msg.edit(port1)
        db.ref(`Configuração/SetIdioma/${message.author.id}`).set('Pt-Br')
        Portugues.stop()
        Ingles.stop()
    })

    Ingles.on("collect", r2 => {
        let ingl1 = new Discord.MessageEmbed()
        .setTitle("🇺🇸| Language Set!")
        .setDescription("The language was set for the English.")

        db.ref(`Configuração/SetIdioma/${message.author.id}`).set('En-Us')
        msg.reactions.removeAll()
        msg.edit(ingl1)
        Portugues.stop()
        Ingles.stop()
    })
    })
  
};

exports.help = {
    name: 'setidioma',
    aliases: ['setlanguage']
}
