const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setPresence({game: {name: "with daddy Andorks//dpw", type: 1}});

});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("messageDelete", (messageDelete) => {
 let modlog = messageDelete.guild.channels.find('name', 'moderation-log');
 const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .addField('Action:', 'Message Deleted' )
   .addField('User:', messageDelete.author.tag)
   .addField('Message Content:', messageDelete.content)
   .addField('Channel', messageDelete.channel);
 return messageDelete.guild.channels.get(modlog.id).send({embed});
});

client.on("messageUpdate", (messageUpdate) => {
 let modlog = messageUpdate.guild.channels.find('name', 'moderation-log');
 const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
   .addField('Action:', 'Message Updated' )
   .addField('User:', messageUpdate.author.tag)
   .addField('Message Old Content:', messageUpdate.oldMessage)
   .addField('Message New Content:', messageUpdate.newMessage)
   .addField('Channel', messageUpdate.channel);
 return messageUpdate.guild.channels.get(modlog.id).send({embed});
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf('!') !== 0) return;

  const args = message.content.slice(1).trim().split(! +/g);
  const command = args.shift().toLowerCase();

if (command=== "help") {
  let channel = message.author
  message.reply("You've been sent a list of commands in your DMs!")
const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .addField("**The prefix for this bot is:**","!")
  .addField("You can contact the owner of this bot on their Discord:","NorthTx_Dev#4196")
  .addField("***COMMANDS***","Below is the list of commands.")
  .addField("Kick [mention]","Kicks the user mentioned")
  .addField("Ban [mention]","Bans the user mentioned.")
  .addField("Requestban [Username:RblxUserID] [Reason + Proof]","Submits a ban request on your behalf, sending you a copy.")
  .addField("Ping","Bot replies with server/API stats.")
  //.addField("AddNSFW","Adds NSFW role, so you may access the channel.")
  //.addField("RemoveNSFW","Removes NSFW role")
  .addField("Lock","Locks channel where as only users with the Moderator role can speak in it.")
  .addField("Unlock","Unlocks the channel")
  .addField("Say [term]","Bot repeats term.")
  .addField("Join","Summons the bot to your current voice channel! (no current music commands yet however)")
  .addField("Purge [number]", "Removes [number] of messages from a channel!")
  .addField("Embed [message]","Creates a embed with the message.")
  .addField("Parents","Replies with Bot parenting info.")
//  .addField("Deport", "Kicks the user, but sends  them a invite link to rejoin.")
  .addField("DiscordInvite", "Replies with a invite to the discord.")
return channel.send({embed}).catch(console.error);
};

if (command=== "join") {
  if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
}

if (command==="kick") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
  if (!message.member.roles.some(r=>["Moderator"].includes(r.name)))
    return message.reply("Unfortunately, you are unable to kick users with your current roles!");

  let member = message.mentions.members.first();
      if(!member)
        return message.reply("You are required to mention a **valid** member of this server!");
      if(!member.kickable)
        return message.reply("I cannot kick that user.");

  let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You are **required** to give a reason to kick a user!");

    await member.send(`You have been kicked from the Department of Public Works Discord for **${reason}**`);
    await member.kick(reason)
        .catch(error => message.reply(`${message.author} I couldn't kick ${member} due to ${error}`));
      message.channel.send(`${member} has been kicked for ${reason}`);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('Action:', 'Kick')
    .addField('User:', `${member}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return message.guild.channels.get(modlog.id).send({embed});
};

if (command==="ban") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
  if (!message.member.roles.some(r=>["Moderator"].includes(r.name)))
    return message.reply("Unfortunately, you are unable to ban users with your current roles!");

  let member = message.mentions.members.first();
      if(!member)
        return message.reply("You are required to mention a **valid** member of this server!");
      if(!member.bannable)
        return message.reply("I cannot ban that user.");

  let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You are **required** to give a reason to ban a user!");

    await member.send(`You have been kicked from the Department of Public Works Discord for **${reason}**`);
    await member.ban(reason)
        .catch(error => message.reply(`${message.author} I couldn't ban ${member} due to ${error}`));
      message.channel.send(`${member} has been banned for ${reason}`);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('Action:', 'Ban')
    .addField('User:', `${member}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return message.guild.channels.get(modlog.id).send({embed});
};

if (command==="ping") {
  const m = await message.channel.send("Ping?");
    m.edit(`Pong. Latency is ${m.createdTimestamp - message.createdTimestamp}ms.  API Latency is ${Math.round(client.ping)}ms`);
};

if (command==="DiscordInvite") {
	message.reply("Here is an invite to join the discord! https://discord.gg/tkyEfyR")
}
	
	
if (command==="deport") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
  if (!message.member.roles.some(r=>["Moderator"].includes(r.name)))
    return message.reply("Unfortunately, you are unable to deport users with your current roles!");

  let member = message.mentions.members.first();
      if(!member)
        return message.reply("You are required to mention a **valid** member of this server!");
      if(!member.kickable)
        return message.reply("I cannot deport that user.");

  let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You are **required** to give a reason to deport a user!");

    await member.send(`You have been deported from the Department of Public Works Discord for **${reason}**.  Here is a link to rejoin: https://discord.gg/tkyEfyR`);
    await member.kick(reason)
        .catch(error => message.reply(`${message.author} I couldn't deport ${member} due to ${error}`));
      message.channel.send(`${member} has been deported for ${reason}`);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('Action:', 'Deport')
    .addField('User:', `${member}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return message.guild.channels.get(modlog.id).send({embed});
};
	
//if (command === "addnsfw") {
//	  let role = message.guild.roles.find("name", "NSFW Access");
//	  message.member.addRole(role).catch(console.error);
//	  message.reply("You've been given NSFW Access!")
//  }

//  if (command === "removensfw") {
//	  let role = message.guild.roles.find("name", "NSFW Access");
//	  message.member.removeRole(role).catch(console.error);
//	  message.reply("Your NSFW Access has been removed. ;(")
//  }

if (command==="setgame") {
    if (message.author.id == "247481591524229120") {
      var argresult = args.join(' ');
  if (!argresult) argresult = null;
    console.log(argresult)
    client.user.setPresence({game: {name: argresult, type: 0}});
    message.reply(`The game has been updated to ${argresult}.`);
  } else {
    message.reply("Unfortunately, you are unable to change the game with your current roles!");
  }
};

if (command==="shutdown") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
  if (message.author.id == "247481591524229120") {
    await message.reply("I am now shuttingdown.....Goodbye.")
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .addField('Action:', 'Shutdown')
      .addField('User:', `Server`)
      .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    return message.guild.channels.get(modlog.id).send({embed});
    process.exit()
  }
};

if (command == "lock") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
	let role = message.guild.roles.find("name", "Verified");
	message.channel.overwritePermissions(
        role,
        { 'SEND_MESSAGES': false },
	"channel locked"
	)
    .then(console.log)
    .catch(console.log);
message.reply("Channel successfully locked.")
message.react("🔒")

const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .addField('Action:', 'Lock Channel')
  .addField('Channel:', `#${message.channel.name}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
return message.guild.channels.get(modlog.id).send({embed});
};

if (command == "unlock") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
	if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
	let role = message.guild.roles.find("name", "Verified");
	message.channel.overwritePermissions(
        role,
        { 'SEND_MESSAGES': true },
	"channel unlocked"
	)
    .then(console.log)
    .catch(console.log);
message.reply("Channel successfully unlocked.")
message.react("🔓")

const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .addField('Action:', 'Unlock Channel')
  .addField('Channel:', `#${message.channel.name}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
return message.guild.channels.get(modlog.id).send({embed});
};


if (command === "bean") {
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

   var mentioned = message.mentions.users.first()
   message.channel.sendMessage("OMG YOU JUST TOTALLY BEANED "+mentioned+" https://cdn.discordapp.com/attachments/390604393134948355/397260159430164482/71po77VsbvL.png")
 };


if (command === "North") {
   message.channel.send("Builds the bot, helps with car and creater of chassis/els!")
};

if (command === "State") {
  message.channel.send("Our amazing car dev and north's bff")
};

if (command === "Rengate") {
  message.channel.send("is just there cause he has money")
};
  
if (command === "Mark") {
  message.channel.send("is our bb scripter :)")
};
  
if (command === "Gio") {
  message.channel.send("who are you again?")
};
  
if (command === "Zack") {
  message.channel.send("some dumbass that put carpet in a burn-tower")
};
	
if (command === "parents") {
  message.channel.send("North is my father (My Creater), State is my evil step mother, Rengate is my cool rich big brother zack is my retarted brother. Gio is my idel and mark is well umm...")
};	

if(command === "purge") {
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("You must provide a number between 2 and 100 to use the purge command!");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

if(command === "embed") {
let modlog = message.guild.channels.find('name', 'moderation-log');
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

      const sayMessage = args.join(" ");

      let esayEmbed = new Discord.RichEmbed()
      .setTitle("Bot Embed")
      .setColor("#0537ff")
      .addField("Message", `${sayMessage}`)
      .setTimestamp();

      const esayMessage = args.join(" ");
      message.delete().catch(O_o=>{});
      message.channel.send(esayEmbed);
      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .addField('Action:', 'Embed Command')
        .addField('Text:', `${sayMessage}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
      return message.guild.channels.get(modlog.id).send({embed});

  }

if (command==="disagreement") {
	let modlog = message.channel
	var mentioned = message.mentions.users.first()
	const embed = new Discord.RichEmbed()
   		 .setColor(0x00AE86)
   		 .addField("If you disagree with how I want my group to be ran, organized, setup and operated, there's this fancy little button you can press. Link to the group too to make it easier for ya: ", " ")
   		 .addField('Group:', `https://www.roblox.com/My/Groups.aspx?gid=4297537`)
    	 .addField('Leave Group:', `https://gyazo.com/9752020486d35af7c744db1854b7bcae`)
 	return message.guild.channels.get(modlog.id).send({embed});
}

if (command==="reqeustban") {
  if(!message.member.roles.some(r=>["Middle Class Citizen"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  let modlog = message.guild.channels.find('name', 'ban-requests');
  let j = "```"
  let shiftlog = args.slice(0).join(' ');
  message.reply("Ban request successfully sent!");
  message.delete().catch(O_o=>{});
  message.author.send(message.author+j+shiftlog+j)
  const embed = new Discord.RichEmbed()
       .setColor(0x00AE86)
       .addField("Requester: ", message.author)
       .addField('Information', j+shiftlog+j)
  return message.guild.channels.get(modlog.id).send({embed});
}

if(command === "say") {
  let modlog = message.guild.channels.find('name', 'moderation-log');
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send(sayMessage);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('Action:', 'Say Command')
    .addField('Text:', `${sayMessage}`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
  return message.guild.channels.get(modlog.id).send({embed});

};

});




client.login(process.env.BOT_TOKEN);
