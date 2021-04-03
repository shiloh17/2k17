const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "serverinfo",
  aliases: ["serverinformation"],
  description: "show server information",
  usage: "serverinfo",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const guild = message.guild;
    const Emojis = guild.emojis.cache.size || "no emoji";
    const Roles = guild.roles.cache.size || "no roles";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;

    const embed = new MessageEmbed()
      .setTitle(guild.name + " information")
      .setColor(Color)
      .setThumbnail(guild.iconURL())
      .addField(`name`, guild.name, true)
      .addField(`id`, `${guild.id}`, true)
      .addField(`owner`, `${guild.owner.user.tag}`, true)
      .addField(`roles count`, Roles, true)
      .addField(`emojis count`, Emojis, true)
      .addField(`members count`, Members, true)
      .addField(`humans count`, Humans, true)
      .addField(`bots count`, Bots, true)
      .addField(`server created at`, guild.createdAt.toDateString())
      .setFooter(`requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};