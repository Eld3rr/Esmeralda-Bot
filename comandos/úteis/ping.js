const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
exports.run = async(client, message, args) => {

    let lang = await db.ref(`Configuração/SetIdioma/${message.author.id}`).once('value')
    lang = lang.val();

    if(!lang) {
      let langz = new Discord.MessageEmbed()
      .addField("Language / Idioma", `English: You need set a language first, use: e!setlanguage
      Português: Você precisa setar um idioma primeiro, utilize: e!setidioma`)
      message.reply(langz)
    };
    //portugues
    if(lang == 'Pt-Br'){
    let embed = new Discord.MessageEmbed()
    .setAuthor("Minha Latência!")
    .addField("Latência:", `${client.ws.ping}ms!`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    message.channel.send(embed)
    };
    //ingles
    if(lang == 'En-Us'){
        let embed = new Discord.MessageEmbed()
        .setAuthor("My Latency!")
        .addField("Latency:", `${client.ws.ping}ms!`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
        message.channel.send(embed)
        };
    };
exports.help = {
    name: 'ping',
    aliases: ['latência']
}
