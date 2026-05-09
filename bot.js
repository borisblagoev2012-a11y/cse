
const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const events =
    require("./events.json");

const client =
    new Client({
        intents: [
            GatewayIntentBits.Guilds
        ]
    });

const config = {

    guildId:
        process.env.GUILD_ID || "1472215986559258734",

    discordBotToken:
        process.env.DISCORD_BOT_TOKEN || "PUT_TOKEN"

};

client.once("ready", () => {

    console.log(`${client.user.tag} online`);

});

client.on("interactionCreate", async interaction => {

    try {

        if (interaction.isChatInputCommand()) {

            if (interaction.commandName === "setevent") {

                const menu =
                    new StringSelectMenuBuilder()
                        .setCustomId("event-select")
                        .setPlaceholder("Select event")
                        .addOptions(

                            events.events.map(event => ({

                                label: event.name,
                                description: event.description.slice(0, 100),
                                value: event.id

                            }))

                        );

                const row =
                    new ActionRowBuilder()
                        .addComponents(menu);

                await interaction.reply({

                    content:
                        "Choose event",

                    components: [row],
                    ephemeral: true

                });

            }

        }

        else if (interaction.isStringSelectMenu()) {

            const event =
                events.events.find(
                    e => e.id === interaction.values[0]
                );

            if (!event)
                return;

            const activeEvent = {

                active: true,

                ...event,

                host:
                    interaction.member.nickname ||
                    interaction.user.username,

                startedAt:
                    new Date().toISOString()

            };

            fs.writeFileSync(
                path.join(__dirname, "activeEvent.json"),
                JSON.stringify(activeEvent, null, 4)
            );

            await axios.post(
                "https://cse-website-mnys.onrender.com/api/event",
                activeEvent
            );

            await interaction.update({

                content:
                    `Updated event to ${event.name}`,

                components: []

            });

        }

    } catch (err) {

        console.error(err);

    }

});

client.login(config.discordBotToken);
