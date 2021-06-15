const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const alexa = require('alexa-bot-api')
const ai = new alexa('aw2plm')

client.on('ready', () => {
    console.log(`Logged in as "${client.user.tag}" with guilds: "${client.guilds.cache.size}"`)
})

client.on('message', message => {
    if (message.channel.type == 'dm') return
    let chatChannel = message.guild.channels.cache.find((x) => x.name == 'chat-with-bot')
    if (message.channel == chatChannel) {
        if (message.author.bot) return
        let content = message.content
        ai.getReply(content).then((r) => message.channel.send(r))
    }
})

client.login(config.token)