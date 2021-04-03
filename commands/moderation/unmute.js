const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unmute",
  aliases: [],
  description: "unmute someone",
  usage: "unmute <Mention User>",
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
        `unmute role not found`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`already unmuted`);
    }

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`member unmuted`)
      .addField(`admin`, `${message.author.tag} (${message.author.id}`)
      .addField(`unmuted member`, `${Member.user.tag} (${Member.user.id})`)
      .setFooter(`requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`something went wrong, try again`);
    }

    //End
  }
};