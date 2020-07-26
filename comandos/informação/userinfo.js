const Discord = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
exports.run = async(bot, message, args) => {

    let desc = await db.ref(`Perfil/User/${message.author.id}/Descrição`).once('value')
    desc = desc.val()

      if(desc === null) desc = '\`Você precisa setar uma biografia, utilize e!desc\`';

    let member = message.mentions.members.first() || message.author;

      let perfil = new Discord.MessageEmbed()
      .setTitle("<:user:735198185823142009> Perfil do Usuário")
      .addField("<:pasta:735198513977098350> Biografia:", `\`${desc}\``)

    message.channel.send(perfil)

  }


exports.help = {
    name: 'perfil',
    aliases: ['userinfo', 'user-info']
}
