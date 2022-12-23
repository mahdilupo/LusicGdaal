const {
  MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);
module.exports = {
  name: `setupmusic`, //the command name for execution & for helpcmd [OPTIONAL]

  category: `Settings`,
  usage: `setupmusic`,

  cooldown: 10, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: `Defines if Autoplay should be enabled on default or not!`, //the command description for helpcmd [OPTIONAL]
  memberpermissions: [`MANAGE_GUILD `], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      //things u can directly access in an interaction!
      const {
        member,
      } = message;
      const {
        guild
      } = member;
      //first declare all embeds
      var embeds = [
        new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Queue List:`)
        ,
        new MessageEmbed()
        .setColor(ee.color)
        .setFooter(message.guild.name, message.guild.iconURL({
          dynamic: true
        }))
        .setImage(message.guild.banner ? message.guild.bannerURL({
          size: 4096
        }) : `https://cdn.discordapp.com/attachments/826910060038455356/953814423003357234/hydra_no_music.jpeg`)
        .setTitle(`No song playing currently`)
        .setDescription(`Youtube, Spotify, Soundcloud supported!`)
      ]
      var Emojis = [
        `0️⃣`,
        `1️⃣`,
        `2️⃣`,
        `3️⃣`,
        `4️⃣`,
        `5️⃣`,
        `6️⃣`,
        `7️⃣`,
        `8️⃣`,
        `9️⃣`,
        `🔟`,
        `🟥`,
        `🟧`,
        `🟨`,
        `🟩`,
        `🟦`,
        `🟪`,
        `🟫`,
      ]
      //now we add the components!
      var components = [
        new MessageActionRow().addComponents([
          new MessageSelectMenu()
          .setCustomId(`MessageSelectMenu`)
          .addOptions([`persian Hip-Hop`, `Strange-Fruits`, `Gaming`, `Chill`, `Rock`, `Jazz`, `Blues`, `Metal`, `Magic-Release`, `NCS | No Copyright Music`, `Default`].map((t, index) => {
            return {
              label: t.substr(0, 25),
              value: t.substr(0, 25),
              description: `Load a Music-Playlist: '${t}'`.substr(0, 50),
              emoji: Emojis[index]
            }
          }))
        ]),
        new MessageActionRow().addComponents([
          new MessageButton().setStyle('SECONDARY').setCustomId('Skip').setEmoji(`⏭`).setLabel(`Skip`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Stop').setEmoji(`🏠`).setLabel(`Stop`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸').setLabel(`Pause`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Autoplay').setEmoji('🔁').setLabel(`Autoplay`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Shuffle').setEmoji('🔀').setLabel(`Shuffle`).setDisabled(),
        ]),
        new MessageActionRow().addComponents([
          new MessageButton().setStyle('SECONDARY').setCustomId('Song').setEmoji(`🔁`).setLabel(`Song`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Queue').setEmoji(`🔂`).setLabel(`Queue`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Forward').setEmoji('⏩').setLabel(`+10 Sec`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Rewind').setEmoji('⏪').setLabel(`-10 Sec`).setDisabled(),
          new MessageButton().setStyle('SECONDARY').setCustomId('Lyrics').setEmoji('📝').setLabel(`Lyrics`).setDisabled(),
        ]),
      ]
      let channel = message.mentions.channels.first();
      if (!channel) return message.reply(`${client.allEmojis.x} **You forgot to ping a Text-Channel!**`)
      //send the data in the channel
      channel.send({
        embeds,
        components
      }).then(msg => {
        client.settings.set(message.guild.id, channel.id, `music.channel`);
        client.settings.set(message.guild.id, msg.id, `music.message`);
        //send a success message
        return message.reply(`${client.allEmojis.check_mark} **Successfully setupped the Music System in:** <#${channel.id}>`)
      });

    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}
