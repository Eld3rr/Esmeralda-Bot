const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
exports.run = async(bot, message, args) => {

   let chwel = await db.ref(`Configura莽茫o/Entrada/${message.guild.id}/Canal`).once('value')
   chwel = chwel.val();
   let msgwel = await db.ref(`Configura莽茫o/Entrada/${message.guild.id}/Mensagem`).once('value')
   msgwel = msgwel.val();
   let titlewel = await db.ref(`Configura莽茫o/Entrada/${message.guild.id}/T铆tulo`).once('value')
   titlewel = titlewel.val();

   let chleav = await db.ref(`Configura莽茫o/Sa铆da/${message.guild.id}/Canal`).once('value')
   chleav = chleav.val();
   let msgleav = await db.ref(`Configura莽茫o/Sa铆da/${message.guild.id}/Mensagem`).once('value')
   msgleav = msgleav.val();
   let titleleav = await db.ref(`Configura莽茫o/Sa铆da/${message.guild.id}/T铆tulo`).once('value')
   titleleav = titleleav.val()

   let roleid = await db.ref(`Configura莽茫o/AutoRole/${message.guild.id}/Cargo`).once('value')
   roleid = roleid.val();

   let chmember = await db.ref(`Configura莽茫o/MemberUpdate/${message.guild.id}/Canal`).once('value')
   chmember = chmember.val();


    if(chwel === null) {
        chwel = '<:desligado:734903023330918500>'
    } else {
        chwel = '<:ligado:734903001323667518>'
    };
    if(msgwel === null) {
        msgwel = '<:desligado:734903023330918500>'
    } else {
        msgwel = '<:ligado:734903001323667518>'
    };
    if(titlewel === null) {
        titlewel = '<:desligado:734903023330918500>'
    } else {
        titlewel = '<:ligado:734903001323667518>'
    };

//======================

    if(chleav === null) {
        chleav = '<:desligado:734903023330918500>'
    } else {
        chleav = '<:ligado:734903001323667518>'
    };
    if(msgleav === null) {
        msgleav = '<:desligado:734903023330918500>'
    } else {
        msgleav = '<:ligado:734903001323667518>'
    };
    if(titleleav === null) {
        titleleav = '<:desligado:734903023330918500>'
    } else {
        titleleav = '<:ligado:734903001323667518>'
    };

//======================

    if(roleid === null) {
    roleid = '<:desligado:734903023330918500>'
    } else {
    roleid = '<:ligado:734903001323667518>'
    };

//======================

    if(chmember === null) {
        chmember = '<:desligado:734903023330918500>'
    } else {
        chmember = '<:ligado:734903001323667518>'
    };

    let Painel = new Discord.MessageEmbed()
    .setTitle('<:config:734901497728598066> Painel de Logs')
    .addField("Entrada:", "馃摛")
    .addField("Sa铆da:", "馃摜")
    .addField("Auto-Role:", "馃憸")
    .addField("Membro Atualizado:", "馃檱鈥嶁檪锔�")
    .setFooter("Reaja de acordo, com o que voc锚 quer!")
    message.channel.send(Painel).then(msg => {
        msg.react('馃摛')
        msg.react('馃摜')
        msg.react('馃憸')
        msg.react('馃檱鈥嶁檪锔�')

        const EntFilter = (reaction, user) => reaction.emoji.name === '馃摛' && user.id === message.author.id;
        const SaiFilter = (reaction, user) => reaction.emoji.name === '馃摜' && user.id === message.author.id;
        const RoleFilter = (reaction, user) => reaction.emoji.name === '馃憸' && user.id === message.author.id;
        const AttFilter = (reaction, user) => reaction.emoji.name === '馃檱鈥嶁檪锔�' && user.id === message.author.id;

        const Ent = msg.createReactionCollector(EntFilter);
        const Sai = msg.createReactionCollector(SaiFilter);
        const Role = msg.createReactionCollector(RoleFilter);
        const Att = msg.createReactionCollector(AttFilter);

        Ent.on("collect", r2 => {
            let Enta = new Discord.MessageEmbed()
            .setTitle("<:config:734901497728598066> Painel de Boas-Vindas")
            .setDescription(`Boas-Vindas`)
            .addField("Canal:", chwel)
            .addField("Mensagem:", msgwel)
            .addField("T铆tulo:", titlewel)
        
           msg.edit(Enta)
        });
        Sai.on("collect", r2 => {
            let Saia = new Discord.MessageEmbed()
            .setTitle("<:config:734901497728598066> Painel de Sa铆da")
            .setDescription("Sa铆da")
            .addField("Canal:", chleav)
            .addField("Mensagem:", msgleav)
            .addField("T铆tulo:", titleleav)

            msg.edit(Saia)
        });

        Role.on("collect", r2 => {
            let Rolea = new Discord.MessageEmbed()
            .setTitle("<:config:734901497728598066> Painel de AutoRole")
            .setDescription("AutoRole")
            .addField("Cargo:", roleid)

            msg.edit(Rolea)
        });

        Att.on("collect", r2 => {
            let atta = new Discord.MessageEmbed()
            .setTitle("<:config:734901497728598066> Painel de Membro Atualizado")
            .setDescription("Membro Atualizado")
            .addField("Canal:", chmember)

            msg.edit(atta)
        })
    });
};

exports.help = {
    name: 'painel',
    aliases: ['panel']
}
