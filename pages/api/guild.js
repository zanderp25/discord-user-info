var ourGuilds = [];
var ourGuildsSetAt = Date.now();


async function loadGuilds() {
    const now = Date.now();
    const last_refresh = ((now - ourGuildsSetAt) / 1000);
    if (last_refresh >= 3600) {
        console.log("Last refresh of bot guilds was " + last_refresh + " seconds ago, refreshing...");
        const response = await fetch(
            "https://discord.com/api/users/@me/guilds",
            {
                headers: {
                    "Authorization": `Bot ${process.env.BOT_TOKEN}`
                }
            }
        )
        if(response.ok) {
            const data = await response.json();
            ourGuilds = data.map(guild => guild.id);
            ourGuildsSetAt = Date.now();
            console.log("Updated cache to populate " + ourGuilds.length + " guilds. ");
        }
        else {
            console.log("Failed to refresh guilds.")
        }
    }
}


export default async function guild(req, res) {
    if(!req.headers.authorization) {
        return res.status(403).json({"error": "unauthorised"})
    }
    await loadGuilds();
    if(!ourGuilds.includes(req.query.id)) return res.status(404).send()
    const response = await fetch(
        "https://discord.com/api/guilds/" + req.query.id + "?with_counts=true",
        {
            headers: {
                Authorization: "Bot " + process.env.BOT_TOKEN
            }
        }
    )
    if(response.status!==200) {
        res.status(204)
    }
    else {
        res.status(response.status)
    }
    res.setHeader("x-upstream", "1").setHeader("Cache-Control", "max-age=806400,min-fresh=3600")
    let data = await response.json();
    if(response.status===200) {
        data.full = true
        res.json(data)
    }
    else {
        res.send()
    }
}