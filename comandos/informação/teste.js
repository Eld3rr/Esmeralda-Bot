const jimp = require("jimp")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
let avatar = await jimp.read(message.author.displayAvatarURL())

let a = jimp.read('https://sm.ign.com/ign_br/news/a/avatar-the/avatar-the-last-airbender-is-getting-expansion-novels_sma8.jpg').then(avatar => {
    avatar.resize(130, 130)
    fundo.composite(avatar,40, 90).write('beta.png')
  })
  .catch(err => {
    console.log('Erro ao carregar a imagem')
  });

message.channel.send(a)

}
exports.help = {
name: "teste",
aliases: []
}
