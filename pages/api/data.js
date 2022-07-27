async function get(endpoint, token) {
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
            return null;
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
    const me = await get("/users/@me", token);
    if(!me) {
        return res.status(401).json({"error": "Invalid token"});
    }
    result.user = me;
    result.guilds = await get("/users/@me/guilds", token);
    result.connections = await get("/users/@me/connections", token);
    return res.status(200).setHeader("x-upstream", "1").setHeader("Cache-Control", "max-age=806400,min-fresh=3600").json(result);
}