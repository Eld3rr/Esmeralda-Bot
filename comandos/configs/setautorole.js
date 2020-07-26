const Discord = require("discord.js");
const firebase = require('firebase');
const db = firebase.database();
exports.run = async(bot, message, args) => {

    let lang = await db.ref(`Configuração/SetIdioma/${message.author.id}`).once('value')
    lang = lang.val();

    if(!lang) {
      let langz = new Discord.MessageEmbed()
      .addField("Language / Idioma", `English: You need set a language first, use: e!setlanguage
      Português: Você precisa setar um idioma primeiro, utilize: e!setidioma`)
      message.reply(langz)
    };

    //port
    if(lang == 'Pt-Br'){
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("Você não tem permissão para isso!")
    }
    let role = message.mentions.roles.first()

    if(!role){
        return message.reply("Você precisa mencionar um cargo, ou digitar o ID do cargo!")
    }

    let sucess = new Discord.MessageEmbed()
    .setTitle("AutoRole")
    .setDescription("Setado AutoRole com sucesso!")
    message.reply(sucess)

    db.ref(`Configuração/AutoRole/${message.guild.id}/Cargo`).set(role.id)
    }
    //ingl

    if(lang == 'En-Us'){
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply("You not have permission!")
    }
    let role = message.mentions.roles.first()

    if(!role){
        return message.reply("You need mention a charge!")
    }

    let sucess = new Discord.MessageEmbed()
    .setTitle("AutoRole")
    .setDescription("Set AutoRole successfully!")
    message.reply(sucess)

    db.ref(`Configuração/AutoRole/${message.guild.id}/Cargo`).set(role.id)
    }
}

exports.help = {
    name: 'setautorole',
    aliases: ['autorole']
}
