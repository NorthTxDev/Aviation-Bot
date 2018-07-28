const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
 });
 
 client.o('message', message => {
  if (message.content === '!test') {
     message.reply('Test Confirmed and working!')
     }
});

// THIS MUST BE THIS WAY
client.login(process.env.BOT_TOKEN);
