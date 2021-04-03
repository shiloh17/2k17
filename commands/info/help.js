const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "help command",
  usage: "help | <Command Name>",
  run: async(client, message, args) => {
    
    message.delete();
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username}`)
    .setDescription(`command list` + 
    "\n\n**moderation**\n`~clear, ~mute, ~unmute, ~tempmute, ~kick, ~ban, ~unban, ~tempban, ~warn, ~warnings, ~resetwarns`" + "\n\n" +
    "**information**\n`~help, ~weather, ~userinfo, ~serverinfo, ~ping`")
    .setFooter(`requested by ${message.author.username}`)
    .setTimestamp();
    
    if (!args.length) return message.channel.send(embed);

    let cmd =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.get(client.aliases.get(args[0].toLowerCase()));

    let embed2 = new MessageEmbed()
      .setColor(Color)
      .setTitle(`${cmd.name} Information!`)
      .addField(`aliases`, cmd.aliases || "none")
      .addField(`usage`, cmd.usage || "no usage")
      .addField(`description`, cmd.description || "no description")
      .setTimestamp();

    if (cmd) {
      return message.channel.send(embed2);
    } else {
      return message.channel.send(embed);
    }
  }
};
