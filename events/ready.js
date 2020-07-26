const Discord = require("discord.js");

module.exports = async(bot, message) => {

    const tabela = [
        {
            name: "The Last of Us Part II", type: "PLAYING"
        },
        {
            name: "Fifa 20", type: "PLAYING"
        },
        {
            name: "GTA V", type: "PLAYING"
        },
        {
            name: "Meu dono me programando", type: "WATCHING"
        },
        {
            name: "Meu criador: Éld3rr_#2583", type: "WATCHING"
        },
        {
            name: "use e.help for help", type: "WATCHING"
        }
    ];

    function Presence() {
        const random = tabela[Math.floor(Math.random() * tabela.length)];
        bot.user.setActivity(random);
      };
      Presence();
      setInterval(() => Presence(), 10000);
  };
