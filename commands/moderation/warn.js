const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "warn",
  aliases: [],
  description: "warn a member",
  usage: "warn <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`invalid user`);

    let Reason = args.slice(1).join(" ");

    client.db.add(`Warnings_${message.guild.id}_${Member.user.id}`, 1);

    let Warnings = client.db.get(
      `Warnings_${message.guild.id}_${Member.user.id}`
    );

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`member warned`)
      .addField(`admin`, `${message.author.tag} (${message.author.id}`)
      .addField(`member`, `${Member.user.tag} (${Member.user.id})`)
      .addField(`member warnings`, Warnings)
      .addField(`reason`, `${Reason || "no reason provided!"}`)
      .setFooter(`requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
