
import { getCreds } from './credits.js'

const creds = await getCreds()

export const TELEGRAM_BOT_TOKEN = ''; // Remplace par ton vrai token
export const MODE = 'Default'; // INDISPENSABLE pour que le bloc "if" de ton main.js s'active
export const REDIRECT_BOT = "" // a redirect bot when the bot is full

export const OWNER_ID = "" // owner id

export const LIMIT = 30; //number of max sessions for the tele bot

export const PUB = false; // Is it a private or public bot 

export const OWNER_NAME = "Arthur" // Your Dev username

export const OWNER_NUM = "50944211972"  // Your number

export const OWNER_TELEGRAM = creds.telegram_id; // Your telegram username

export const BOT_NAME = "ARTHUR-XMD" // Bot name

export const TELEGRAM_CHANNEL = creds.telegram_channel // Your telegram channel name

export const TELEGRAM_GROUP = "" // Your telegram group name

export const WA_CHANNEL = "https://whatsapp.com/channel/0029Vb7z3g3L2AU1PcP5ea3d" //whatsapp channel


