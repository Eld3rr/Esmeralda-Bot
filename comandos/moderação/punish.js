const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
exports.run = async(bot, message, args) => {

    let lang = await db.ref(`Configura莽茫o/SetIdioma/${message.author.id}`).once('value')
    lang = lang.val();

    if(!lang) {
      let langz = new Discord.MessageEmbed()
      .addField("Language / Idioma", `English: You need set a language first, use: e!setlanguage
      Portugu锚s: Voc锚 precisa setar um idioma primeiro, utilize: e!setidioma`)
      message.reply(langz)
    };
//portugues
    if(lang == 'Pt-Br'){
    
    if(!message.member.hasPermission("BAN_MEMBERS")){
        return message.reply("Voc锚 n茫o possui permiss茫o!")
    }
    if(!message.member.hasPermission("KICK_MEMBERS")){
        return message.reply("Voc锚 n茫o possui permiss茫o!")
    }

    let user = message.mentions.members.first();
    if(!user){
        let user = new Discord.MessageEmbed()
        .setTitle("Puni莽茫o")
        .setDescription("Voc锚 deve mencionar um usu谩rio!")
        message.reply(user)
    };

    let cent = new Discord.MessageEmbed()
    .setTitle("Central da Puni莽茫o")
    .setDescription("Reaja de acordo com a fun莽茫o que voc锚 queira!")
    .addField("Banir:", "馃敤")
    .addField("Expulsar", "馃獡")
    .addField("Em breve:", "Warn")
    message.reply(cent).then(msg => {
        msg.react('馃敤')
        msg.react('馃獡')

        const BanFilter = (reaction, user) => reaction.emoji.name === '馃敤' && user.id === message.author.id;
        const KickFilter = (reaction, user) => reaction.emoji.name === '馃獡' && user.id === message.author.id;

        const Ban = msg.createReactionCollector(BanFilter);
        const Kick = msg.createReactionCollector(KickFilter);

        Ban.on("collect", async r2 => {
            if(!message.member.hasPermission("BAN_MEMBERS")){
                return message.reply("Voc锚 n茫o possui permiss茫o!")
            }
            await user.ban()
            let Banido = new Discord.MessageEmbed()
            .setTitle("Banido")
            .setDescription(`${user} foi banido com sucesso!`)
            msg.edit(Banido)
        });
        Kick.on("collect", async r2 => {
            if(!message.member.hasPermission("KICK_MEMBERS")){
                return message.reply("Voc锚 n茫o possui permiss茫o!")
            }
            await user.kick()
            let Expulso = new Discord.MessageEmbed()
            .setTitle("Expulso")
            .setDescription(`${user} foi expulso com sucesso!`)
            msg.edit(Expulso)
        });
    });
    };

    //ingles

    if(lang == 'En-Us'){
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.reply("You not have permission!")
        }
        if(!message.member.hasPermission("KICK_MEMBERS")){
            return message.reply("You not have permission!")
        }
    
        let user = message.mentions.members.first();
        if(!user){
            let user = new Discord.MessageEmbed()
            .setTitle("Punished")
            .setDescription("You must mentioned a user!")
            message.reply(user)
        };
    
        let cent = new Discord.MessageEmbed()
        .setTitle("Center of Punishment")
        .setDescription("React of wake up with the function a you want!")
        .addField("Ban:", "馃敤")
        .addField("Kick", "馃獡")
        .addField("Coming soon:", "Warn")
        message.reply(cent).then(msg => {
            msg.react('馃敤')
            msg.react('馃獡')
    
            const BanFilter = (reaction, user) => reaction.emoji.name === '馃敤' && user.id === message.author.id;
            const KickFilter = (reaction, user) => reaction.emoji.name === '馃獡' && user.id === message.author.id;
    
            const Ban = msg.createReactionCollector(BanFilter);
            const Kick = msg.createReactionCollector(KickFilter);
    
            Ban.on("collect", async r2 => {
                await user.ban()
                let Banido = new Discord.MessageEmbed()
                .setTitle("Baned")
                .setDescription(`${user} was baned successfully!`)
                msg.edit(Banido)
            });
            Kick.on("collect", async r2 => {
                await user.kick()
                let Expulso = new Discord.MessageEmbed()
                .setTitle("Kicked")
                .setDescription(`${user} was kick successfully!`)
                msg.edit(Expulso)
            });
        });
    }
};

exports.help = {
    name: 'punir',
    aliases: ['punish', 'punished', 'puni莽茫o']
}
