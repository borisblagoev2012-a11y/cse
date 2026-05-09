
const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const rest =
    new REST({
        version: "10"
    }).setToken(
        process.env.DISCORD_BOT_TOKEN || "PUT_TOKEN"
    );

const commands = [

    new SlashCommandBuilder()

        .setName("setevent")

        .setDescription(
            "Set active event"
        )

].map(command => command.toJSON());

(async () => {

    try {

        await rest.put(

            Routes.applicationGuildCommands(

                "YOUR_APPLICATION_ID",

                process.env.GUILD_ID ||
                "1472215986559258734"

            ),

            {
                body: commands
            }

        );

        console.log(
            "Commands deployed"
        );

    } catch (err) {

        console.error(err);

    }

})();
