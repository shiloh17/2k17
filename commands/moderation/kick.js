const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "kick a member!",
  usage: "kick <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        `u dont have permission lol`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `specify the member that you want to ban`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`invalid member`);

    if (Member.id === message.author.id)
      return message.channel.send(`u cant kick yourself`);

    if (Member.id === client.user.id)
      return message.channel.send(` `);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`i cant kick the owner`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.kickable)
      return message.channel.send(`i cant kick the member`);

    try {
      console.log(`kick`);

      setTimeout(function() {
        User.kick({ reason: `${Reason || "no reason provided"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`member kicked`)
        .addField(`admin`, `${message.author.tag} (${message.author.id}`)
        .addField(`kicked member`, `${Member.tag} (${Member.id})`)
        .addField(`reason`, `${Reason || "no reason provided"}`)
        .setFooter(`requested by ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `you have been kicked from **${message.guild.name}** for ${Reason ||
            "no reason provided"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) just got kicked from ${
          message.guild.name
        } for ${Reason || "no reason provided"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `i cant kick that member lol`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
