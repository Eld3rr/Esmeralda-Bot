const Discord = require("discord.js");
const fs = require("fs");
const { readdirSync } = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
const firebase = require("firebase");

//#Eventos

bot.on("guildMemberAdd", async(member) => {
  let role = await db.ref(`Configuração/AutoRole/${member.guild.id}/Cargo`).once('value')
  let canal = await db.ref(`Configuração/Entrada/${member.guild.id}/Canal`).once('value')
 canal = canal.val()
 if(canal === null) {
  return;
  };
 let msg = await db.ref(`Configuração/Entrada/${member.guild.id}/Mensagem`).once('value')
 msg = msg.val()
 let titulo = await db.ref(`Configuração/Entrada/${member.guild.id}/Título`).once('value')
 titulo = titulo.val()
 let membro = msg.replace('{membro}', member);
 let users = membro.replace('{users}', member.guild.memberCount)

 let embed = new Discord.MessageEmbed()
 .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({dynamic: true}))
 .setTitle(titulo)
 .setDescription(users)
 .setFooter(`ID do Membro: ${member.id}`, member.user.displayAvatarURL({dynamic: true}))
 .setThumbnail(member.guild.iconURL({dynamic: true}))
 .setTimestamp()

 bot.channels.cache.get(canal).send(embed)

 role = role.val();
 member.roles.add(role).catch(e => {
  return;
});
});

bot.on("guildMemberRemove", async(member) => {
 let canal = await db.ref(`Configuração/Saída/${member.guild.id}/Canal`).once('value')
 canal = canal.val()
 let msg = await db.ref(`Configuração/Saída/${member.guild.id}/Mensagem`).once('value')
 msg = msg.val()
 let title = await db.ref(`Configuração/Saída/${member.guild.id}/Título`).once('value')
 title = title.val()
 let membro = msg.replace('{membro}', member);
 let users = membro.replace('{users}', member.guild.memberCount)

 let embed = new Discord.MessageEmbed()
 .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({dynamic: true}))
 .setTitle(title)
 .setDescription(users)
 .setFooter(`ID do Membro: ${member.id}`, member.user.displayAvatarURL({dynamic: true}))
 .setThumbnail(member.guild.iconURL({dynamic: true}))
 .setTimestamp()

 bot.channels.cache.get(canal).send(embed)
 if(canal === null){
  return;
 }
});

bot.on("guildMemberUpdate", async(oldMember, newMember) => {

  let canal = await db.ref(`Configuração/MemberUpdate/${newMember.guild.id}/Canal`).once('value')
  canal = canal.val()

  let membros = [oldMember.nickname, newMember.nickname];

  if(membros[0] == null)
  {
    membros[0] = oldMember.user.username;
  }
  if(membros[1] == null)
  {
    membros[1] = newMember.user.username;
  }

  let embed = new Discord.MessageEmbed()
  .setAuthor("Nome alterado")
  .setDescription(`${oldMember.user.username} mudou seu apelido!`)
  .addField("<:direit:733839589801721906> Antigo Apelido:", `${membros[0]}`)
  .addField("<:abdireita:733839549821747291> Novo Apelido:", `${membros[1]}`)

  bot.channels.cache.get(canal).send(embed)

  if(canal === null){
    return;
   }

});

bot.on("guildCreate", async(guild) => {
  
  let entrei = new Discord.MessageEmbed()
  .setTitle("Fui adicionado")
  .addField("Nome do Servidor:", `${guild.name}`)
  .addField("Membros:", `${guild.memberCount}`)
  .addField("Criador:", `${guild.owner}`)
  .addField("Região", `${guild.region}`)
  bot.channels.cache.get("734025492381958246").send(entrei)

});

bot.on("guildDelete", async(guild) => {
  
  let sai = new Discord.MessageEmbed()
  .setTitle("Fui removido")
  .addField("Nome do Servidor:", `${guild.name}`)
  .addField("Membros:", `${guild.memberCount}`)
  .addField("Criador:", `${guild.owner}`)
  .addField("Região", `${guild.region}`)
  bot.channels.cache.get("734036644562468864").send(sai)
});

//---------Final--------\\

//# Handlers Comandos! 
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./comandos", async (err, files) => {
  if (err) console.error(err); 
  let arquivojs = files.filter(file => !file.endsWith('.js'))
    arquivojs.forEach((f, i) => {
        fs.readdir(`./comandos/${f}`, async (erro, file) => {     
          for(let b = 0; b < file.length;b++){
          let props = require(`./comandos/${f}/${file[b]}`);
          if(!props.help) return console.log(`\x1b[31m[ERRO] Está faltando exports.help{  } no Comando ${file[b]}`)
          console.log(`COMANDO ${file[b]} CARREGADO!`)
          if(!props.help.name) return console.log(`\x1b[31m[ERRO]  Está faltando o Nome do Comando! no comando ${file[b]} ] \x1b[0m`)
          bot.commands.set(props.help.name, props);
          if(props.help.aliases){
          props.help.aliases.forEach(alias => {
          if(alias) return bot.aliases.set(alias, props.help.name);
          });    
        }
        }
      })
  })
})

//# Handlers Eventos!
const evtFiles = readdirSync("./events");
console.log("log", `Carregando o total de ${evtFiles.length} eventos`);
evtFiles.forEach(f => {
  const eventName = f.split(".")[0];
  const event = require(`./events/${f}`);

  bot.on(eventName, event.bind(null, bot));
});

//--------------------------->

bot.on("message", message => {
  let prefix = config.prefix;
  let mention = [`<@${bot.user.id}>`, `<@!${bot.user.id}>`]
		mention.find(mention => {
		if(message.content === mention) {
			let embed = new Discord.MessageEmbed()
		.setTitle('Meu prefixo')
		.setDescription(`Meu Prefixo é \`${prefix}\`, Use \`${prefix}ajuda\` para ver meus Comandos!`)
		message.channel.send(embed)
		}
	  });
	
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

  let cmd;
  if(!message.content.startsWith(config.prefix)) return ;       
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase(); 
  let args = messageArray.slice(1);
  let arquivocmd = bot.commands.get(command.slice(prefix.length));  

    if(arquivocmd) 
    {
    arquivocmd.run(bot, message, args);            
    }
    else if(bot.aliases.has(command.slice(prefix.length))) {
    cmd = bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    }
    if(cmd) return cmd.run(bot, message, args);

  if(!arquivocmd && !cmd){
message.channel.send(':x: | Comando inexistente! Utilize e!ajuda ou e!help para acessar os comandos!')
}

});

//--------------------------->

//--------------------------->

bot.on('ready', async() => {
    console.log(`Online como ${bot.user.username}`);
    let server = bot.guilds.cache.get("718571865878298685")
    let ch = server.channels.cache.get("734925579618615306")

    let on = new Discord.MessageEmbed()
    .setDescription("Acabei de Iniciar!")
    .addField("Latência:", `${bot.ws.ping}`)
    bot.channels.cache.get(ch).send(on)
});

bot.login(process.env.token)
