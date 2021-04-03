const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs"],
  description: "clear your messages",
  usage: "clear <Message Amount>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "you dont have permission to use this command"
      );

    if (!args[0])
      return message.channel.send(`invalid number`);

    if (isNaN(args[0]))
      return message.channel.send(`insert the number value`);

    if (args[0] < 4)
      return message.channel.send(
        `you can delete ${args[0]} messages by yourself, stop being lazy lol`
      );

    if (args[0] > 100)
      return message.channel.send(
        `i cant delete ${args[0]} bc the discord limit`
      );

    let Reason = args.slice(1).join(" ") || "no reason provided";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`messages deleted`)
        .addField(`admin`, `${message.author.tag} (${message.author.id}`)
        .addField(`channel`, `${message.channel.name} (${message.channel.id}`)
        .addField(`deleted messages`, `${Message.size}`)
        .addField(`reason`, `${Reason}`)
        .setFooter(`requested by ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  }
};