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

    if(lang == 'Pt-Br'){

    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        let a = new Discord.MessageEmbed()
        .setAuthor("Permissão Necessária")
        .setDescription("Você não tem permissão para isso!")
        .addField("Requer:", "**MANAGE_MESSAGES**")
        .setColor("RED")
       return message.channel.send(a)
    }
    let msg11 = new Discord.MessageEmbed()
    .setDescription("Em que canal você quer, que a mensagem seja enviada?")
    message.channel.send(msg11).then(msg => {
        let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            canal = c.mentions.channels.first()
            
            if(!canal) {
                let canal1 = new Discord.MessageEmbed()
                .setAuthor("Menção de um Canal!")
                .setDescription("Você precisa mencionar um canal!")
                .addField("Exemplo:", "e!setleave <#canal>")
                message.channel.send(canal1);
                
            } else {
                let msg22 = new Discord.MessageEmbed()
                .setDescription("Qual a mensagem você quer, que seja enviada após alguém sair?")
                .addField("Parâmetros:", `{membro} puxa o nome do usuário!
                {users} puxa o número de usuários do servidor!`)
                message.channel.send(msg22).then(msg2 => {
                    let cl = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                    .on('collect', c => {
                        desc = c.content

                        let msg33 = new Discord.MessageEmbed()
                        .setDescription("Qual o título que você quer, para a mensagem de Saída?")
                        message.channel.send(msg33).then(msg3 => {
                            let ck = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                            .on('collect', c => {
                                title = c.content

                                let sucesso = new Discord.MessageEmbed()
                                .setAuthor("Setado!")
                                .setDescription("Foi setado com o sucesso, a mensagem de Saida!")
                                message.channel.send(sucesso)

                                    db.ref(`Configuração/Saída/${message.guild.id}/Canal`).set(canal.id)
                                    db.ref(`Configuração/Saída/${message.guild.id}/Mensagem`).set(desc)
                                    db.ref(`Configuração/Saída/${message.guild.id}/Título`).set(title)
                            });
                        });
                    });
                });
            };
        });
    });
    };

    //ingl

    if(lang == 'En-Us'){
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        let a = new Discord.MessageEmbed()
        .setAuthor("Permission Required")
        .setDescription("You not have permission!")
        .addField("Require:", "**MANAGE_MESSAGES**")
        .setColor("RED")
       return message.channel.send(a)
    }

    let msg11 = new Discord.MessageEmbed()
    .setDescription("What channel do you want the message to be sent to?")
    message.channel.send(msg11).then(msg => {
        let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            canal = c.mentions.channels.first()
            
            if(!canal) {
                let canal1 = new Discord.MessageEmbed()
                .setAuthor("Mention of a Channel!")
                .setDescription("You need mention a channel!")
                .addField("Exemple:", "e!setleave <#channel>")
                message.channel.send(canal1);
                
            } else {
                let msg22 = new Discord.MessageEmbed()
                .setDescription("What message do you want, to be sent after someone Leave?")
                .addField("Parâmetros:", `{membro} pull the username!
                {users} pulls the number of users from the server!`)
                message.channel.send(msg22).then(msg2 => {
                    let cl = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                    .on('collect', c => {
                        desc = c.content

                        let msg33 = new Discord.MessageEmbed()
                        .setDescription("What title do you want, for the Incoming message?")
                        message.channel.send(msg33).then(msg3 => {
                            let ck = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                            .on('collect', c => {
                                title = c.content

                                let sucesso = new Discord.MessageEmbed()
                                .setAuthor("Seted!")
                                .setDescription("It was set with success, the message of Leave!")
                                message.channel.send(sucesso)

                                    db.ref(`Configuração/Saída/${message.guild.id}/Canal`).set(canal.id)
                                    db.ref(`Configuração/Saída/${message.guild.id}/Mensagem`).set(desc)
                                    db.ref(`Configuração/Saída/${message.guild.id}/Título`).set(title)
                            });
                        });
                    });
                });
            };
        });
    });
    };
};

exports.help = {
    name: 'setleave',
    aliases: ['leave', 'setsaida']
}
