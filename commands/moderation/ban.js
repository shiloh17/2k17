const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "ban someone",
  usage: "ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `member?`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`mention a valid member`);

    if (Member.id === message.author.id)
      return message.channel.send(`cant ban yourself`);

    if (Member.id === client.user.id)
      return message.channel.send(` `);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`cant ban the owner`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.bannable) return message.channel.send(`i cant ban that member`);

    try {
      console.log(`Member Is Going To Get Ban!`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "no reason provided"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`member banned`)
        .addField(`admin`, `${message.author.tag} (${message.author.id}`)
        .addField(`banned member`, `${Member.tag} (${Member.id})`)
        .addField(`reason`, `${Reason || "no reason provided"}`)
        .setFooter(`requested by ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `you have been banned from **${message.guild.name}** for ${Reason ||
            "no reason provided"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) Just Got Banned From ${
          message.guild.name
        } For ${Reason || "no reason provided"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `i cant ban a member who is more higher than me`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
