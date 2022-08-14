import { Component, Fragment } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import _def from "../public/default.png";
import { Tab } from '@headlessui/react';
const host = "https://userinfo.zanderp25.com/"
const redirect_uri = `https://discord.com/api/oauth2/authorize?client_id=1007644265045827615&redirect_uri=${encodeURIComponent(host)}&response_type=token&scope=identify%20email%20connections%20guilds%20guilds.join&prompt=none`


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
  let [hidden, setHidden] = useState(true);
  let [data, setData] = useState(props.data);
  const url = data.icon === null ? `https://cdn.discordapp.com/embed/avatars/${data.id % 5}.png` : `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp`;
  const _this = props._this
  const onLoad = () => {
    console.log("loaded image", data.id);
    if(data.full===true) {
      return;
    }
    _this.resolveGuild(data.id).then((full_data) => {let x = data; Object.assign(x, full_data); setData(x)});
  }
  if(hidden) {
    return (
      <div className={styles.guildCard} onClick={() => {setHidden(!hidden)}}>
        <div>
          <h1>{data.name}</h1>
          <p>{data.id}</p>
        </div>
        <div>
          <Image src={url+"?size=64"} alt="icon" width={64} height={64} onLoadingComplete={()=>{onLoad()}}/>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.guildCard} onClick={() => {setHidden(!hidden)}}>
      <div>
        <h1>{data.name}</h1>
        <p>{data.id}</p>
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
          <Image src={url+"?size=128"} alt="icon" width={128} height={128} onLoadingComplete={onLoad}/>
        </div>
      </div>
    </div>
  )
}

function User(props) {
  const data = props.data;
  const url = data.icon === null ? `https://cdn.discordapp.com/embed/avatars/${data.id % 5}.png` : `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp`;
  const bannerUrl = data.banner === null ?
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" : // Transparent pixel
    `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.png`;

  function flag_parser() {
    const flags = data.flags
    let ret = [];
    if(flags & 1<<0) ret.push("Discord Employee");
    if(flags & 1<<1) ret.push("Partnered Server Owner");
    if(flags & 1<<2) ret.push("Hypesquad Events");
    if(flags & 1<<3) ret.push("Bug Hunter Level 1");
    if(flags & 1<<6) ret.push("Hypesquad Bravery");
    if(flags & 1<<7) ret.push("Hypesquad Brilliance");
    if(flags & 1<<8) ret.push("Hypesquad Balance");
    if(flags & 1<<9) ret.push("Early Supporter");
    if(flags & 1<<12) ret.push("System User");
    if(flags & 1<<13) ret.push("Bug Hunter Level 2");
    if(flags & 1<<14) ret.push("Verified Bot");
    if(flags & 1<<16) ret.push("Verified Bot Developer");
    if(flags & 1<<18) ret.push("Discord Certified Moderator");
    if(flags & 1<<19) ret.push("Bot HTTP Interactions Only");
    if(data.premium_type != 0) ret.push("Nitro User");
    return ret;
  }


  return (
    <div className={styles.userCard}>
      <div>
        <img src={bannerUrl} alt="banner" className={false? styles.bannerImage: styles.noBannerImage} style={{background: data.banner_color}}/>
        <img src={url} alt="icon" className={styles.iconImage}/>
        <div className={styles.info}>
          <h1>{data.username}#{data.discriminator}</h1>
          <p>{data.id}</p>
          <ul>
            {/* <li>ID: <code>{data.id}</code></li>
            <li>Username: {data.username}</li>
            <li>Discriminator: {data.discriminator}</li> */}
            <li>Flags: {flag_parser().join(", ")}</li>
            <li>Nitro type: {data.premium_type == 0? "None": data.premium_type == 1? "Nitro Classic": "Nitro"}</li>
            <li>Banner colour: <span style={{color: data.banner_color}}>{data.banner_color}</span></li>
            <li>Email: {data.email} {data.verified ? '(Verified)' : '(Not verified)'}</li>
            <li>Two-factor authentication enabled: {data.mfa_enabled ? 'Yes' : 'No'}</li>
            <li>Locale: {data.locale}</li>
            <li>Avatar hash: {data.avatar || "No custom avatar"}</li>
            <li>Avatar decoration: {data.avatar_decoration || "No custom decoration"}</li>
            <li>Banner hash: {data.banner || "No custom banner"}</li>
          </ul>
          <p><code>{JSON.stringify(data, null, 2)}</code></p>
        </div>
      </div>
    </div>
  )
}

function UserPage(props) {
  const state = props.state;
  return (
    <main>
      <div className={styles.info}>
        <h1>
          Welcome, {state.user.username || 'deleted-user'}#{state.user.discriminator || '0000'}!
        </h1>
      </div>
      <User data={state.user}/>
    </main>
  )
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: null,
      access_token: null,
      scope: null,
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
        "/api/data?add=true&scope=" + params.scope, 
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
      this.setState(newData);
    }
    this.setState({
      access_token: params.access_token,
      scope: params.scope,
      on_mobile: window.screen.availWidth <= 480
    }, callback);
  }

  async resolveGuild(guild, _default) {
    while(1) {
      let response = await fetch(
        "/api/guild?id=" + guild,
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
      else if (!response.ok || response.status !== 200) {
        return _default;
      }
      else {
        return await response.json();
      }
    }
  }

  async resolveGuilds() {
    let newData = [];
    for(let _data of this.state.guilds) {
      if(_data && _data.roles!==undefined) {
        continue;
      }
      else {
        let id = _data.id;
        let data = await this.resolveGuild(id, null);
        if(!data) {
          newData.push(_data)
        }
        else {
          Object.assign(data, _data);
          newData.push(data);
        }
      }
    }
    this.setState({ guilds: newData || this.state.guilds });
  }

  render() {
    if(this.state.user!==undefined) {
      return (
        <main>
        <Tab.Group>
          <div className={styles.tabBar}>
            <Tab.List>
              <Tab  as={Fragment}>
                {({ selected }) => (
                  <button className={selected ? styles.tabSelected : styles.tabUnselected}>
                    User
                  </button>
                )}
              </Tab>
              <Tab  as={Fragment}>
                {({ selected }) => (
                  <button className={selected ? styles.tabSelected : styles.tabUnselected}>
                    Servers
                  </button>
                )}
              </Tab>
              <Tab  as={Fragment}>
                {({ selected }) => (
                  <button className={selected ? styles.tabSelected : styles.tabUnselected}>
                    Friends
                  </button>
                )}
              </Tab>
            </Tab.List>
            <span>Logged in as <b>{this.state.user.username || 'deleted-user'}#{this.state.user.discriminator || '0000'}</b></span>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <UserPage state={this.state}/>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles.info}>
                <h1>You are in {this.state.guilds.length}{this.state.guilds.length == 69 ? " (Nice)" : ""} servers.</h1>
              </div>
              {this.state.guilds.map((data, index) => <Guild data={data} key={index} _this={this}/>)}
            </Tab.Panel>
            <Tab.Panel><div className={styles.info}>u have no friends :c</div></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
          {/* <button onClick={() => {console.debug(JSON.stringify(this.state, null, 4))}} hidden={this.state.on_mobile}>
            print snatched data (as JSON) to console
          </button> */}
        </main>
      )
    }

    const Loader = () => {
      const [n, setN] = useState(0);
      setInterval(() => {setN(n+1)}, 100);
      return <span>{'.'.repeat(n)||null}</span>
    }

    return (
      <div>
        <h1>Loading dashboard<Loader/></h1>
      </div>
    );
  }
}