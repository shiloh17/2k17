const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "mute",
  aliases: [],
  description: "mute someone",
  usage: "mute <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`invalid user`);

    let Role = message.guild.roles.cache.find(role => role.name === "muted").id;

    if (!Role)
      return message.channel.send(
        `role not found`
      );

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`already muted`);
    }

    let Reason = args.slice(1).join(" ");

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`member muted`)
      .addField(`admin`, `${message.author.tag} (${message.author.id}`)
      .addField(`muted member`, `${Member.user.tag} (${Member.user.id})`)
      .addField(`reason`, `${Reason || "no reason provided"}`)
      .setFooter(`requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`something went wrong, try again`);
    }

    //End
  }
};
