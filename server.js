
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

const config = {

    port:
        process.env.PORT || 3000,

    guildId:
        process.env.GUILD_ID || "1472215986559258734",

    discordBotToken:
        process.env.DISCORD_BOT_TOKEN || "PUT_TOKEN",

    erlcApiKey:
        process.env.ERLC_API_KEY || "PUT_ERLC_KEY"

};

let cachedStats = {

    discordMembers: 0,
    erlcPlayers: 0,
    maxPlayers: 50,
    queue: 0

};

async function fetchDiscordMembers() {

    try {

        const response =
            await axios.get(
                `https://discord.com/api/v10/guilds/${config.guildId}?with_counts=true`,
                {
                    headers: {
                        Authorization:
                            `Bot ${config.discordBotToken}`
                    }
                }
            );

        cachedStats.discordMembers =
            response.data.approximate_member_count || 0;

    } catch (err) {

        console.error(err.message);

    }

}

async function fetchERLCStats() {

    try {

        const response =
            await axios.get(
                "https://api.policeroleplay.community/v1/server",
                {
                    headers: {
                        "server-key":
                            config.erlcApiKey
                    }
                }
            );

        const data = response.data;

        cachedStats.erlcPlayers =
            data.CurrentPlayers || 0;

        cachedStats.maxPlayers =
            data.MaxPlayers || 50;

        cachedStats.queue =
            data.Queue || 0;

    } catch (err) {

        console.error(err.message);

    }

}

app.get("/api/stats", (req, res) => {

    res.setHeader(
        "Cache-Control",
        "no-store"
    );

    res.json(cachedStats);

});

app.get("/api/event", (req, res) => {

    try {

        res.setHeader(
            "Cache-Control",
            "no-store"
        );

        const event =
            JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "activeEvent.json"),
                    "utf8"
                )
            );

        res.json(event);

    } catch {

        res.json({
            active: false
        });

    }

});

app.post("/api/set-event", (req, res) => {

    fs.writeFileSync(
        path.join(__dirname, "activeEvent.json"),
        JSON.stringify(req.body, null, 4)
    );

    res.json({
        success: true
    });

});

fetchDiscordMembers();
fetchERLCStats();

setInterval(fetchDiscordMembers, 30000);
setInterval(fetchERLCStats, 30000);

app.listen(config.port, () => {

    console.log(
        `Running on ${config.port}`
    );

});
