const Discord = require("discord.js");
const firebase = require("firebase");
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
    //portugues
    if(lang == 'Pt-Br'){

    let dias = 0;
    let semanas = 0;

     let uptime = ``;
     let totalSegundos = (bot.uptime / 1000);
     let horas = Math.floor(totalSegundos / 3600);
     totalSegundos %= 3600;
     let minutos = Math.floor(totalSegundos / 60);
     let segundos = Math.floor(totalSegundos % 60);

     if (horas > 23){
         dias = dias + 1;
         horas = 0;

     }

     if (dias == 7) {
     dias = 0;
     semanas = semanas + 1;
    }

    if (semanas > 0) {
        uptime += `${semanas} semanas, `;
    }

    if (minutos > 60){
        minutos = 0;
    }

    uptime += `**${dias}d** **${horas}h** **${minutos}m** **${segundos}s**`;

    let up = new Discord.MessageEmbed()
    .setTitle("Tempo Online")
    .setDescription(`Estou a ${uptime} online!`)
    message.reply(up)
    }
    //ingles
    if(lang == 'En-Us'){
        let dias = 0;
        let semanas = 0;
    
         let uptime = ``;
         let totalSegundos = (bot.uptime / 1000);
         let horas = Math.floor(totalSegundos / 3600);
         totalSegundos %= 3600;
         let minutos = Math.floor(totalSegundos / 60);
         let segundos = Math.floor(totalSegundos % 60);
    
         if (horas > 23){
             dias = dias + 1;
             horas = 0;
    
         }
    
         if (dias == 7) {
         dias = 0;
         semanas = semanas + 1;
        }
    
        if (semanas > 0) {
            uptime += `${semanas} semanas, `;
        }
    
        if (minutos > 60){
            minutos = 0;
        }
    
        uptime += `**${dias}d** **${horas}h** **${minutos}m** **${segundos}s**`;
    
        let up = new Discord.MessageEmbed()
        .setTitle("On Time")
        .setDescription(`I'm the ${uptime} On!`)
        message.reply(up)
    }
}

exports.help = {
    name: 'ontime',
    aliases: ['uptime', 'online']
}
