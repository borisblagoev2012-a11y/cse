
let lastEventId = null;

async function fetchStats() {

    try {

        const response =
            await fetch("/api/stats?t=" + Date.now());

        const data =
            await response.json();

        document.getElementById("discordMembers")
            .innerText =
            (data.discordMembers || 0).toLocaleString();

        const players =
            data.erlcPlayers ||
            data.currentPlayers ||
            0;

        const maxPlayers =
            data.maxPlayers || 50;

        document.getElementById("erlcPlayers")
            .innerText =
            `${players} / ${maxPlayers}`;

    } catch (err) {

        console.error(err);

    }

}

async function fetchEvent() {

    try {

        const response =
            await fetch("/api/event?t=" + Date.now());

        const data =
            await response.json();

        if (!data.active) {

            document.getElementById("eventName")
                .innerText =
                "No Active Event";

            return;

        }

        if (lastEventId === data.id)
            return;

        lastEventId = data.id;

        document.getElementById("eventName")
            .innerText =
            data.name;

        document.getElementById("eventDescription")
            .innerText =
            data.description;

        document.getElementById("eventHost")
            .innerText =
            `HOST: ${data.host}`;

        document.getElementById("eventType")
            .innerText =
            `TYPE: ${data.type}`;

        document.getElementById("eventDifficulty")
            .innerText =
            `DIFFICULTY: ${data.difficulty}`;

        document.getElementById("eventParticipants")
            .innerText =
            `LIMIT: ${data.maxParticipants}`;

    } catch (err) {

        console.error(err);

    }

}

fetchStats();
fetchEvent();

setInterval(fetchStats, 3000);
setInterval(fetchEvent, 3000);
