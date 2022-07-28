const dotenv = require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildBans,
	],
});

client.on("presenceUpdate", (oldMember, newMember) => {
	const guild = newMember.guild;
	member = newMember;
	if (newMember.user.bot) return;

	activityLength = newMember.member.presence.activities.length;

	if (activityLength > 0) {
		console.log("Użytkownicy mają " + activityLength + " aktywność");

		for (let i = 0; i < activityLength; i++) {
			console.log(
				"Aktywność na pozycji " +
					i +
					" to " +
					newMember.member.presence.activities[i].name.toLowerCase()
			);
			if (
				newMember.member.presence.activities[i].name.toLowerCase() ==
				"league of legends"
			) {
				console.log(`${newMember.user.tag} dostał bana za granie w lola.`);
				try {
					newMember.user.send(
						"Nie graj w ligę, ban do odwołania XD - administracja serwera klasowego🙂"
					);
					guild.members
						.ban(`${newMember.user.id}`, {
							reason: "Granie w League Of Legends",
						})
						.catch((err) => {
							console.error(err);
						});
					break;
				} catch (err) {}
			}
		}
	} else {
		console.log("Brak aktywności");
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
	if (message.content === "JD") {
		message.author.send("JD");
	}
});

client.login(process.env.token);
