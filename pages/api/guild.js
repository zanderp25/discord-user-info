export default async function guild(req, res) {
    if(!req.headers.authorization) {
        return res.status(403).json({"error": "unauthorised"})
    }
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
        res.json(data)
    }
    else {
        res.send()
    }
}