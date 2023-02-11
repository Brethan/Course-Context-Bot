const { Client, GatewayIntentBits, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js")
require("dotenv").config(null)
const course_codes = require("./course_codes.json")
const course = require("./user_modules/course.js")

const client = new Client({
	"intents": [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution,
	]
})

client.login(process.env.TOKEN);
/** @type {Map<string, string>} */
const courseMsg = new Map();

client.on("ready", () => {
	console.log(client.user.tag, "is ready to fuck");
})
client.on("messageCreate", message => {
	if (!message || !message.content) return;

	const { content } = message;

	const matches = content.match(/[A-z]{4}([^\w]|_){0,}[0-9]{4}/g)
	if (!matches)
		return;

	const firstMatch = matches[0];
	const department = firstMatch.substring(0, 4).toUpperCase();
	const courseNumber = firstMatch.substring(firstMatch.length - 4);

	if (!course_codes[department] || !course_codes[department].includes(courseNumber))
		return;

	console.log(department, course_codes[department].find(x => x === courseNumber))
	const courseCode = department + courseNumber;
	message.react("💡");
	courseMsg.set(message.id, courseCode);

})

client.on("messageReactionAdd", async (reaction, user) => {
	if (user.bot) return;
	if (reaction.partial) {
		reaction = await reaction.fetch()
	}

	const { message } = reaction;
	const { id } = message;

	if (!courseMsg.has(id)) return;

	const courseCode = courseMsg.get(id);
	const actionRow = new ActionRowBuilder()
		.addComponents(new ButtonBuilder()
			.setCustomId("kek")
			.setLabel(courseCode)
			.setStyle(ButtonStyle.Primary)
		);

	message.reply({ content: "Click to see the course description",
		components: [actionRow], "allowedMentions": false
	})

})

client.on("interactionCreate", interaction => {
	if (!interaction.isButton()) return;
	await 
	interaction.reply({content: "loser.", ephemeral: true})
})