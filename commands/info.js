
import configManager from '../utils/manageConfigs.js'

import { BOT_NAME } from '../config.js'

import { OWNER_NAME } from '../config.js'

import fs from 'fs';

import path from 'path';

import { WA_CHANNEL } from "../config.js"


export async function info(message, client) {

    const remoteJid = message.key.remoteJid;

    const today = new Date();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDay = daysOfWeek[today.getDay()];

    const currentDate = today.getDate();

    const currentMonth = today.getMonth() + 1; 

    const currentYear = today.getFullYear();

    const owner = "🌹 Arthur 🌹";

    const number = client.user.id.split(':')[0];

    const username = message.pushName || "Unknown";

    const t = ` 
> ╭─────────────────╮
    🌹 ${BOT_NAME} 🌹
> ╰─────────────────╯
> ╭─────────────────╮
> 🌷 Prefix : ${configManager.config.users[number].prefix}
> 🌷 Hello, ${username}  
> 🌷 Day : ${currentDay}
> 🌷 Date : ${currentDate}/${currentMonth}/${currentYear} 
> 🌷 Version : 5.3.0
> 🌷 Plugins : 64
> 🌷 Type : XMD        
> ╰─────────────────╯

> ╭──[ 🥀🥀🥀🥀🥀🥀 ]──────╮
> ⚘ 
> ⚘ 🥀 ping
> ⚘ 🥀 getid
> ⚘ 🥀 sudo
> ⚘ 🥀 tourl
> ⚘ 🥀 owner    
> ⚘ 🥀 update
> ⚘ 🥀 delsudo
> ⚘ 🥀 getsudo    
> ╰─────────────────╯

> ╭──[ 🌷🌷🌷🌷🌷🌷🌷 ]─────╮
> ⚘
> ⚘ 🥀 online
> ⚘ 🥀 welcome
> ⚘ 🥀 autotype
> ⚘ 🥀 autoreact
> ⚘ 🥀 setprefix
> ⚘ 🥀 getconfig
> ⚘ 🥀 statuslike
> ⚘ 🥀 autorecord        
> ╰─────────────────╯

> ╭──[ ⚘⚘⚘⚘⚘⚘⚘ ]─────╮
> ⚘
> ⚘ 🥀 bye
> ⚘ 🥀 kick
> ⚘ 🥀 purge        
> ⚘ 🥀 mute
> ⚘ 🥀 unmute
> ⚘ 🥀 promote
> ⚘ 🥀 demote
> ⚘ 🥀 gclink      
> ⚘ 🥀 antilink
> ⚘ 🥀 kickall
> ⚘ 🥀 promoteall
> ⚘ 🥀 demoteall
> ╰─────────────────╯

> ╭──[ 🥀🥀🥀🥀🥀🥀🥀 ]─────╮
> ⚘
> ⚘ 🥀 vv 
> ⚘ 🥀 take  
> ⚘ 🥀 save 
> ⚘ 🥀 photo
> ⚘ 🥀 setpp
> ⚘ 🥀 getpp
> ⚘ 🥀 toaudio
> ⚘ 🥀 sticker
> ╰─────────────────╯

> ╭──[ ⚘⚘⚘⚘⚘⚘⚘⚘⚘ ]──╮
> ⚘ 
> ⚘ 🥀 img
> ⚘ 🥀 play
> ⚘ 🥀 tiktok
> ╰─────────────────╯

> ╭──[ 🌹🌹🌹🌹🌹🌹 ]──────╮
> ⚘
> ⚘ 🥀 tag
> ⚘ 🥀 tagadmin
> ⚘ 🥀 tagall
> ⚘ 🥀 settag  
> ⚘ 🥀 respons
> ╰─────────────────╯

> Powered By ${OWNER_NAME} Tech 🥷🏾
    `
;

    await client.sendMessage(remoteJid, {

        image: { url: "menu.jpg" },

        caption: t,

        quoted: message

    });

    await client.sendMessage(remoteJid, {

            audio: { url: "menu.mp3" }, 

            mimetype: 'audio/mp4',

            ptt: false,

            quoted: message
        });
}   

export default info;
