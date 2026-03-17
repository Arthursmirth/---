
import group from '../commands/group.js';

import pingCommand from '../commands/ping.js';

import info from '../commands/info.js';

import video from '../commands/video.js'

import viewonce from '../commands/viewonce.js'

import tiktok from '../commands/tiktok.js'

import react from '../commands/react.js'

import sudo from '../commands/sudo.js'

import tag from '../commands/tag.js'

import test from '../commands/test.js'

import settitle from '../commands/settitle.js'

import take from '../commands/take.js'

import fs from 'fs';

import update from '../update.js'

//import crazy from '../commands/crazy.js'

import getpp from '../commands/getpp.js'

import gcstatus from '../commands/gcstatus.js'

import tourl from '../commands/tourl.js';

import sticker from '../commands/sticker.js'

import play from '../commands/play.js'

import sender from '../commands/sender.js'

import fuck from '../commands/fuck.js'

import channelSender from '../commands/channelSender.js'

import dlt from '../commands/dlt.js'

import save from '../commands/save.js'

import pp from '../commands/pp.js'

import presence from '../commands/online.js'

import configManager from '../utils/manageConfigs.js'

import premiums from '../commands/premiums.js'

import reactions from '../commands/reactions.js'

import media from '../commands/media.js'

import set from '../commands/set.js'

import getconf from '../commands/getconfig.js'

import auto from '../commands/auto.js'

import owner from '../commands/owner.js'

import img from '../commands/img.js'

import statusLike from '../commands/statuslike.js'

import { createWriteStream } from 'fs';

import { OWNER_NUM } from '../config.js'


export let creator = [`13438827135@s.whatsapp.net`]

export let premium = [`${OWNER_NUM}@s.whatsapp.net`]


async function handleIncomingMessage(event, client) {

   const number = client.user.id
    ? client.user.id.split(':')[0] 
    : [];


    let userLid = '';

    const free = true;

    try {
      const data = JSON.parse(fs.readFileSync(`sessions/${number}/creds.json`, 'utf8'));
      userLid = data?.me?.lid || client.user?.lid || '';
    } catch (e) {
      userLid = client.user?.lid || '';
    }

    const lid = userLid ? [userLid.split(':')[0] + "@lid"] : [];

    const messages = event.messages;

    const prefix = configManager.config?.users[number]?.prefix || '';

    const likeState = configManager.config?.users[number]?.like;

    for (const message of messages) {

       console.log(message)

        const messageBody = (message.message?.extendedTextMessage?.text || message.message?.conversation || '').toLowerCase();

        const remoteJid = message.key.remoteJid;

        const approvedUsers = configManager.config?.users[number]?.sudoList;

        const cleanParticipant = message.key?.participant ? message.key.participant.split("@") : [];

        const cleanRemoteJid = message.key?.remoteJid ? message.key.remoteJid.split("@") : [];

        if (!messageBody || !remoteJid) continue;

        auto.autotype(message, client);

        auto.autorecord(message, client);

        tag.respond(message, client, lid);

        group.linkDetection(message, client, lid);

        group.mentiondetect(message, client, lid);

        presence(message, client, configManager.config?.users[number]?.online);

        statusLike(message, client, configManager.config?.users[number]?.like);

        reactions.auto(message, client, configManager.config?.users[number]?.autoreact, configManager.config?.users[number]?.emoji);

        if (messageBody.startsWith(prefix) && (message.key.fromMe || approvedUsers.includes(cleanParticipant[0] || cleanRemoteJid[0]) || lid.includes(message.key.participant || message.key.remoteJid))) {

            const commandAndArgs = messageBody.slice(prefix.length).trim();

            const parts = commandAndArgs.split(/\s+/);

            const command = parts[0];

            // Route commands
            switch (command) {
            
                case 'ping':

                    await react(message, client);

                    await pingCommand(message, client);

                    break;

                case 'update':

                    await react(message, client);

                    await update(message, client);

                    break;


                case 'gcstatus':

                    await react(message, client);

                    await gcstatus(message, client);

                    break;


                case 'settitle':

                    await react(message, client);

                    await settitle(message, client);

                    break;

                case 'test':

                    await react(message, client);

                    await test(message, client);

                    break;

                case 'tourl':

                    await react(message, client);

                    await tourl(message, client);

                    break;

                case 'getconfig':

                    await react(message, client);

                    await getconf(message, client, number);

                    break;

                case 'getpp':

                    await react(message, client);

                    await getpp(message, client);

                    break;

                case 'tiktok':

                    await react(message, client);

                    await tiktok(message, client);

                    break;

                case 'owner':

                    await react(message, client);

                    await owner(message, client);

                    break;

                case 'setpp':

                    await react(message, client);

                    await pp(message, client);

                    break;

                case 'photo':

                    await react(message, client);

                    await media.photo(message, client);

                    break;

                case 'toaudio':

                    await react(message, client);

                    await media.tomp3(message, client);

                    break;

                case 'menu':

                    await react(message, client);

                    await info(message, client);

                    break;

                case 'autoreact':

                    await react(message, client);

                    await reactions.autoreact(message, client);

                    break;

                case 'bye':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)

                        ) {
                            try {
                                await group.bye(message, client);

                        

                            } catch (error) {
                                await client.sendMessage(message.key.remoteJid, { 
                                    text: `An error occurred while trying to leave the group: ${error.message}` 
                                });

                                console.error("Error in bye command:", error);
                            }
                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;

                case 'kickall':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {
                                await group.kickall(message, client);

                        

                            } catch (error) {
                                await client.sendMessage(message.key.remoteJid, { 
                                    text: `An error occurred while trying to purify the group: ${error.message}` 
                                });

                                console.error("Error in kickall command:", error);
                            }
                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;


                case 'purge':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {
                                await group.purge(message, client);

                        

                            } catch (error) {
                                await client.sendMessage(message.key.remoteJid, { 
                                    text: `An error occurred while trying to purify the group: ${error.message}` 
                                });

                                console.error("Error in purge command:", error);
                            }
                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;

                case 'kick':

                    await react(message, client);

                    await group.kick(message, client);

                    break;

                case 'promote':

                    await react(message, client);

                    if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await group.promote(message, client);
                                
                                await channelSender(message, client, "Succceded in promoting target", 2);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to promote target: ${error.message}` 
                                });

                                console.error("Error in demote command:", error);
                            }
                        } else {
                            
                                await channelSender(message, client, "command only for bot owner", 2);
                        }

                        break;

                case 'demote':

                    await react(message, client);

                    if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await group.demote(message, client);
                                
                                await channelSender(message, client, "Succceded in demoting target", 2);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to demote target: ${error.message}` 
                                });

                                console.error("Error in demote command:", error);
                            }
                        } else {
                            
                                await channelSender(message, client, "command only for bot owner", 2);
                        }

                        break;

                case 'vv':

                    await react(message, client);

                    await viewonce(message, client);

                    break;

                case 'demoteall':

                    await react(message, client);

                    if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await group.dall(message, client, userLid);
                                
                                await channelSender(message, client, "Succceded in demoting everyone", 1);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to demote everyone: ${error.message}` 
                                });

                                console.error("Error in demoteall command:", error);
                            }
                        } else {
                            
                                await channelSender(message, client, "command only for bot owner", 2);
                        }

                        break;

                case 'promoteall':

                    await react(message, client);

                    if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await group.pall(message, client);
                                
                                await channelSender(message, client, "Succceded in promoting everyone", 1);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to promote everyone: ${error.message}` 
                                });

                                console.error("Error in promoteall command:", error);
                            }
                        } else {
                            
                                await channelSender(message, client, "command only for bot owner", 2);
                        }

                        break;

                case 'mute':

                    await react(message, client);

                    await group.mute(message, client);

                    break;

                case 'unmute':

                    await react(message, client);

                    await group.unmute(message, client);

                    break;


                case 'sudo':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await sudo.sudo(message, client, configManager.config?.users[number]?.sudoList || []);

                                configManager.save()

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to sudo the target: ${error.message}` 

                                });

                                console.error("Error in sudo command:", error);
                            }

                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;


                case 'online':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await set.setonline(message, client, configManager.config?.users[number]?.online);

                                configManager.save()

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to sudo the online cmd: ${error.message}` 

                                });

                                console.error("Error in online command:", error);
                            }

                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;


                case 'getsudo':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await sudo.getsudo(message, client, configManager.config?.users[number]?.sudoList || []);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to get sudo list: ${error.message}` 

                                });

                                console.error("Error in getsudo command:", error);
                            }

                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;


                case 'delsudo':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {
                                await sudo.delsudo(message, client, configManager.config?.users[number]?.sudoList || []);

                                configManager.save()

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to delsudo the target: ${error.message}` 
                                });

                                console.error("Error in delsudo command:", error);
                            }
                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;

                case 'tagall':

                    await react(message, client);

                    await tag.tagall(message, client);

                    break;

                
                case 'tag':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner  ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {
                                await tag.tag(message, client);

                            } catch (error) {
                                
                                return
                            }
                            
                        } else {

                            await client.sendMessage(message.key.remoteJid, {text:"command only for owner"})
                        }

                        break;


                 case 'tagadmin':

                    await react(message, client);

                    await tag.tagadmin(message, client);

                    break;

                case 'take':

                    await react(message, client);

                    await take(message, client);

                    break;

                case 'sticker':

                    await react(message, client);

                    await sticker(message, client);

                    break;

                case 'play':

                    await react(message, client);

                    await play(message, client);

                    break;

                case 'img':

                    await react(message, client);

                    await img(message, client);

                    break;

                case 'video':

                    await react(message, client);

                    await video(message, client);

                    break;

                case 'getid':

                    await react(message, client);

                    await group.gcid(message, client);

                    break;

                case 'settag':

                    await react(message, client);

                    await tag.settag(message, client);

                    break;

                case 'gclink':

                    await react(message, client);

                    await group.gclink(message, client);

                    break;

                case 'antilink':

                    await react(message, client);

                    await group.antilink(message, client);

                    break;

                case 'dlt':

                    await react(message, client);

                    await dlt(message, client);

                    break;

                case 'respons':

                    await react(message, client);

                    await tag.tagoption(message, client);

                     break;


                case 'setprefix':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await set.setprefix(message, client);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to change the prefix ${error.message}` 
                                });

                                console.error("Error in setprefix command:", error);
                            }
                        } else {

                            await channelSender(message, client, "command only for bot owner", 2)
                        }

                        break;

                case 'statuslike':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await set.setlike(message, client);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to change the status like state ${error.message}` 
                                });

                                console.error("Error in status like  command:", error);
                            }
                        } else {

                            await channelSender(message, client, "command only for bot owner", 2)
                        }

                        break;

                case 'autorecord':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await set.setautorecord(message, client);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to change autorecord status ${error.message}` 
                                });

                                console.error("Error in autorecord command:", error);
                            }
                        } else {

                            await channelSender(message, client, "command only for bot owner", 2)
                        }

                        break;

                case 'autotype':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await set.setautotype(message, client);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to change autotype status ${error.message}` 
                                });

                                console.error("Error in autotype command:", error);
                            }
                        } else {

                            await channelSender(message, client, "command only for bot owner", 2)
                        }

                        break;

                case 'welcome':

                    await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {

                                await set.setwelcome(message, client);

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to change the welcome status ${error.message}` 
                                });

                                console.error("Error in welcome command:", error);
                            }
                        } else {

                            await channelSender(message, client, "command only for bot owner", 2)
                        }

                        break; 

                case 'save':

                        await react(message, client);

                        if (
                            message.key.fromMe ||
                            message.key.participant === owner || 
                            message.key.remoteJid === owner ||
                            lid.includes(message.key.participant || message.key.remoteJid)
                        ) {
                            try {
                                await save(message, client);
                                

                            } catch (error) {
                                await client.sendMessage(message.key.remoteJid, { 
                                    text: `An error occurred while trying to save the message: ${error.message}` 
                                });

                                console.error("Error in kill command:", error);
                            }
                        } else {


                                await channelSender(message, client, "command only for bot owner", 2);
                        }

                        break;


                case 'addprem':

                    await react(message, client);

                        if (creator.includes((message.key.participant || message.key.remoteJid))) {

                            try {

                                await premiums.addprem(message, client, premium);

                                await client.sendMessage(message.key.remoteJid, { text: `✅ _User successfully added to prem list._` });

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to addprem the target: ${error.message}` 

                                });

                                console.error("Error in addprem command:", error);
                            }

                        } else {

                            await channelSender(message, client, "command only for the creator, Contact arthur tech", 2);
                        }

                        break;

                case 'delprem':

                    await react(message, client);

                        if (creator.includes((message.key.participant || message.key.remoteJid))) {

                            try {

                                await premiums.delprem(message, client, premium);


                                await client.sendMessage(message.key.remoteJid, { text: `✅ _User successfully remove prem list._` });

                            } catch (error) {

                                await client.sendMessage(message.key.remoteJid, { 

                                    text: `An error occurred while trying to delprem the target: ${error.message}` 

                                });

                                console.error("Error in delprem command:", error);
                            }

                        } else {

                            await channelSender(message, client, "command only for the creator, Contact arthur tech", 2);
                        }

                        break;


            }
        }
    }
}

export default handleIncomingMessage;