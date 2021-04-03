const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ping",
  aliases: [],
  description: "pong",
  usage: "ping",
  run: async (client, message, args) => {
    //Start
    message.delete();

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`ms: ${client.ws.ping}`)
      .setFooter(`requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
