const Discord = require("discord.js");
const os = require("os");
const firebase = require("firebase");
const db = firebase.database();
exports.run = async(bot, message, args) => {

    let lang = await db.ref(`Configuração/SetIdioma/${message.author.id}`).once('value')
    lang = lang.val();

    if(!lang) {
      let langz = new Discord.MessageEmbed()
      .addField("Language / Idioma", `English: You need set a language first, use: e!setlanguage
      Português: Você precisa setar um idioma primeiro, utilize: e!setidioma`)
      message.channel.send(langz)
    };

    //portugues
    if(lang == 'Pt-Br'){
    let memberCount = 0
    bot.users.cache.forEach((member) => {
      if(!member.bot) memberCount++;
    })

    const but = new Discord.MessageEmbed()
    .setAuthor("Sobre Mim")
    .setDescription("Nasci no dia 06/07/2020, em meio a Pandemia do Covid-19!\nMeu intuito Ã© trazer entretenimento e moderaÃ§Ã£o para seu servidor!")
    .addField("Meu criador:", "Éld3rr_#2583")
    .addField("Estatisticas", `Membros: \`${memberCount}\`
    Servidores: \`${bot.guilds.cache.size}\`
    Canais: \`${bot.channels.cache.size}\`
    Comandos: \`${bot.commands.size}\``)
    .addField("Informações", `Host: [Heroku](https://heroku.com)
    Database: [Firebase](https://firebase.google.com)
    Livraria: [Discord](https://discord.js.org/#/)
    Ping: \`${bot.ws.ping}ms\`
    Versão: \`1.0.0\``)
    .addField('CPU & VPN', `CPU: \`${os.cpus().map((i) => `${i.model}`)[0]}\`
 <:imac:727314907829370891> Plataforma: \`${os.platform()}\`
<:memoria:727314935960436916> Memoria Ram: \`${(os.totalmem() /1024 /1024).toFixed(2)} mb.\`
<:memoria:727314935960436916> Memoria Restante: \`${(os.freemem() /1024 /1024).toFixed(2)} mb.\`
<:memoria:727314935960436916> Memoria Usada: \`${(process.memoryUsage().heapUsed / 1024 / 1024 /2).toFixed(2)}%\``)
    .addField("Úteis:", `**[Me Adicione](https://discord.com/oauth2/authorize?client_id=714937188059447377&scope=bot&permissions=8)**\n**[Suporte](https://discord.gg/ANRpgVg)**`)
    message.channel.send(but)
    }

    //ingles
    if(lang == 'En-Us'){
        let memberCount = 0
        bot.users.cache.forEach((member) => {
          if(!member.bot) memberCount++;
        })
    
        const but = new Discord.MessageEmbed()
        .setAuthor("About Me")
        .setDescription("I was born on 07/06/2020, amid the Covid-19 Pandemic! \ NMy intention is to bring entertainment and moderation to your server!")
        .addField("My creator:", "Éld3rr_#2583")
        .addField("Statistics", `Members: \`${memberCount}\`
        Guilds: \`${bot.guilds.cache.size}\`
        Channels: \`${bot.channels.cache.size}\`
        Commands: \`${bot.commands.size}\``)
        .addField("Informations", `Host: [Heroku](https://heroku.com)
        Database: [Firebase](https://firebase.google.com)
        Livrary: [Discord](https://discord.js.org/#/)
        Ping: \`${bot.ws.ping}ms\`
        Version: \`1.0.0\``)
        .addField('CPU & VPN', `CPU: \`${os.cpus().map((i) => `${i.model}`)[0]}\`
     <:imac:727314907829370891> Plataform: \`${os.platform()}\`
    <:memoria:727314935960436916> Memory Ram: \`${(os.totalmem() /1024 /1024).toFixed(2)} mb.\`
    <:memoria:727314935960436916> Remaining memory: \`${(os.freemem() /1024 /1024).toFixed(2)} mb.\`
    <:memoria:727314935960436916> Memory Usad: \`${(process.memoryUsage().heapUsed / 1024 / 1024 /2).toFixed(2)}%\``)
        .addField("Useful:", `**[Add Me](https://discord.com/oauth2/authorize?client_id=714937188059447377&scope=bot&permissions=8)**\n**[Support](https://discord.gg/ANRpgVg)**`)
        message.channel.send(but)
    }
}

exports.help = {
    name: 'botinfo',
    aliases: ['bot-info', 'botinfor']
}
