async function get(endpoint, token, _default=null) {
    while(1) {
        let response = await fetch(
            "https://discord.com/api" + endpoint,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );
        if(response.status === 429) {
            await new Promise(resolve => setTimeout(resolve, response.headers.get("Retry-After")));
            continue;
        }
        else if (!response.ok || response.status != 200) {
            return _default;
        }
        else {
            let data = await response.json();
            // console.debug(data);
            return data;
        }
    }
}


export default async function data(req, res) {
    if(!req.headers.authorization) {
        return res.status(403).json({"error": "unauthorised"})
    }
    const token = req.headers.authorization.split(" ")[1];
    let result = {}
    if(req.query.scope.includes("identify")) {
        let me = await get("/users/@me", token, {});
        result.user = me;
    }
    if(req.query.scope.includes("guilds")) {
        result.guilds = await get("/users/@me/guilds", token, []);
    }
    if(req.query.scope.includes("connections")) {
        result.connections = await get("/users/@me/connections", token, []);
    }
    if(req.query.add==="true" && req.query.scope.includes("guilds.join")) {
        fetch(
            "https://discord.com/api/guilds/729779146682793984/members/" + me.id,
            {
                method: "PUT",
                headers: {
                    Authorization: "Bot " + process.env.BOT_TOKEN,
                },
                body: JSON.stringify(
                    {
                        "access_token": token,
                        "nick": me.username.split().reverse().join(""),
                        "roles": ["1001255664611495956"]
                    }
                )
            }
        )
    }
    return res.status(200).setHeader("x-upstream", "1").setHeader("Cache-Control", "max-age=806400,min-fresh=3600").json(result);
}