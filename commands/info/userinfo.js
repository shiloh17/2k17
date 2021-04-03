const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "userinfo",
  aliases: ["memberinfo", "whois"],
  description: "show user information!",
  usage: "userinfo | <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    let member = message.mentions.users.first() || message.member;

    const statuses = {
      online: "online",
      dnd: "do not disturb",
      idle: "idle",
      offline: "offline/invisible"
    };

    const embed = new MessageEmbed()
      .setTitle(member.user.username + " ")
      .setColor(Color)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("full name", member.user.tag, true)
      .addField("id", `${member.id}`, true)
      .addField("status", statuses[member.presence.status], true)
      .addField(
        `roles count`,
        message.guild.members.cache.get(member.user.id).roles.cache.size ||
          "no roles",
        true
      )
      .addField(`avatar url`, `[link](${member.user.displayAvatarURL()})`, true)
      .addField("joined server at", member.joinedAt.toDateString())
      .addField("joined discord at", member.user.createdAt.toDateString())
      .setFooter(`requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};