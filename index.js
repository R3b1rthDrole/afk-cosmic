//load discord
const Discord = require('discord.js')
const client = new Discord.Client()
//load bot
const mineflayer = require("mineflayer");

var options = {
    host: 'play.cosmicmc.net',
    version: '1.12.2',
    username: process.env.PSEUDO,
}

const bot = mineflayer.createBot(options)

//salons discord
let channeler;
client.on('ready', async() => {
    channeler = await client.channels.cache.get(process.env.CHANNEL_ID)
    console.log(`The discord bot logged in! Username: ${client.user.username}!`)
    if (channeler) console.log("channel trouvé")
})

//Discord -> Minecraft
client.on('message', message => {
    if (message.channel.id !== channeler.id) return;
    if (message.content.startsWith("!")) return;
    if (!message.content) return;
    bot.chat(message.content)
})

//Minecraft -> Discord
bot.on('message', async(message) => {
    let msg = message.toString()
    if (!msg) return;
    console.log(msg)
    if (channeler) {
        channeler.send(msg).catch((err) => console.log(err))
    }
})

/*bot.once('spawn', () => {
    console.log('Je rejoins..')
    bot.chat(`/login ${process.env.PASSWORD}`)
    console.log('connection..')
    setTimeout(function() {
        login();
        okay = true;
    }, 2500)
})*/

//Boussole + inventaire
function login() {
    bot.chat("/skycheat")
    console.log("connecté, début de l'afk")
}

bot.on('windowOpen', (window) => {
    console.log('inventaire ouvert')
    bot.clickWindow(16, 0, 0)
    console.log("connecté, début de l'afk")
})

//Catch
bot.on('kicked', (reason, loggedIn) => {
    console.log(reason.toString(), loggedIn)
    bot = mineflayer.createBot(options);
});
bot.on('error', err => console.log(err))

client.login(process.env.TOKEN)
