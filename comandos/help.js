const firebase = require("firebase");
const db = firebase.database();
const Discord = require("discord.js");
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
    let ajud1 = new Discord.MessageEmbed()
    .setTitle("Painel de Comandos")
    .setDescription("Aqui está todos os meus comandos! Reaja de acordo com as funções que você queira encontrar!")
    .addField("Moderação: ", "<:axe:735120496294625303>")
    .addField("Úteis: ", "<:import:735106869852373002>")
    .addField("Config: ", "<:config:734901497728598066>")

    message.channel.send(ajud1).then(msg => {
        msg.react('735120496294625303')
        msg.react('735106869852373002')
        msg.react('734901497728598066')

        const ModeraçãoFilter = (reaction, user) => reaction.emoji.id === '735120496294625303' && user.id === message.author.id;
        const ÚteisFilter = (reaction, user) => reaction.emoji.id === '735106869852373002' && user.id === message.author.id;
        const ConfigFilter = (reaction, user) => reaction.emoji.id === '734901497728598066' && user.id === message.author.id;

        const Moderação = msg.createReactionCollector(ModeraçãoFilter);
        const Úteis = msg.createReactionCollector(ÚteisFilter);
        const Config = msg.createReactionCollector(ConfigFilter);

        Moderação.on("collect", r2 => {
            let Moderação = new Discord.MessageEmbed()
            .setTitle("<:axe:735120496294625303> Moderação")
            .addField("e!punish", "Você puni algum usuário!")
            .addField("e!clear", "Você limpa o chat!")
            msg.edit(Moderação)
        });

        Úteis.on("collect", r2 => {
            let Úteis = new Discord.MessageEmbed()
            .setTitle("<:import:735106869852373002> Úteis")
            .addField("e!ping:", "Você vê minha latência!")
            .addField("e!userinfo:", "Você vê as informações de usuários!")
            .addField("e!botinfo", "Você vê minhas informações.")
            .addField("e!ping", "Você vê minha latência!")
            .addField("e!ontime", "Você vê quanto tempo eu estou online!")
            .addField("e!setidioma", "Você seta um idioma!")
            msg.edit(Úteis)
        });

        Config.on("collect", r2 => {
            let Configs = new Discord.MessageEmbed()
            .setTitle("<:config:734901497728598066> Configs")
            .addField("e!setwelcome", "Você seta a log de Boas-Vindas!")
            .addField("e!setleave", "Você seta a log de Saída!")
            .addField("e!setautorole", "Você seta um cargo ao um usuário entrar!")
            msg.edit(Configs)
        });
    })
    };
//ingles
    if(lang == 'En-Us'){
        let ajud1 = new Discord.MessageEmbed()
        .setTitle("Panel of Commands")
        .setDescription("Here is all the my commands! React of wake up with the functions a you want to find!")
        .addField("Moderation: ", "<:axe:735120496294625303>")
        .addField("Useful: ", "<:import:735106869852373002>")
        .addField("Config: ", "<:config:734901497728598066>")
    
        message.channel.send(ajud1).then(msg => {
            msg.react('735120496294625303')
            msg.react('735106869852373002')
            msg.react('734901497728598066')
    
            const ModeraçãoFilter = (reaction, user) => reaction.emoji.id === '735120496294625303' && user.id === message.author.id;
            const ÚteisFilter = (reaction, user) => reaction.emoji.id === '735106869852373002' && user.id === message.author.id;
            const ConfigFilter = (reaction, user) => reaction.emoji.id === '734901497728598066' && user.id === message.author.id;
    
            const Moderação = msg.createReactionCollector(ModeraçãoFilter);
            const Úteis = msg.createReactionCollector(ÚteisFilter);
            const Config = msg.createReactionCollector(ConfigFilter);
    
            Moderação.on("collect", r2 => {
                let Moderação = new Discord.MessageEmbed()
                .setTitle("<:axe:735120496294625303> Moderação")
                .addField("e!punish", "You punished some user!")
                .addField("e!clear", "You clear the chat!")
                msg.edit(Moderação)
            });
    
            Úteis.on("collect", r2 => {
                let Úteis = new Discord.MessageEmbed()
                .setTitle("<:import:735106869852373002> Úseful")
                .addField("e!ping:", "You see my latency!")
                .addField("e!userinfo:", "You see the informations of users!")
                .addField("e!botinfo", "You see my informations.")
                .addField("e!ontime", "You see how much time I'm online!")
                .addField("e!setlanguage", "You set a language!")
                msg.edit(Úteis)
            });
    
            Config.on("collect", r2 => {
                let Configs = new Discord.MessageEmbed()
                .setTitle("<:config:734901497728598066> Configs")
                .addField("e!setwelcome", "You set the Welcome log!")
                .addField("e!setleave", "You set the Exit log!")
                .addField("e!setautorole", "You set a position when a user enters!")
                msg.edit(Configs)
            });
        })
    }

};

exports.help = {
    name: 'ajuda',
    aliases: ['help']
}
