const Discord = require("discord.js");
const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "weather",
  aliases: [],
  description: "show given location weather information!",
  usage: "weather <Location>",
  run: async (client, message, args) => {
    //Start
    message.delete();

    if (!args[0]) return message.channel.send("specify location");

    weather.find({ search: args.join(" ") }, function(error, result) {
      if (error) return message.channel.send(`Something Went Wrong, Try Again Later!`);

      if (result === undefined || result.length === 0)
        return message.channel.send(
          `Invalid Location, Please Give Valid Location!`
        );

      var current = result[0].current;
      var location = result[0].location;

      const Weather = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`${location.name} Weather!`)
        .setDescription(`${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .addField("degree type", location.degreetype, true)
        .addField("temperature", `${current.temperature}°`, true)
        .addField("humidity", `${current.humidity}%`, true)
        .addField("wind", current.winddisplay, true)
        .addField("feels like", `${current.feelslike}°`, true)
        .addField("timezone", `UTC${location.timezone}`, true)
        .setTimestamp();

      message.channel.send(Weather);
    });

    //End
  }
};
