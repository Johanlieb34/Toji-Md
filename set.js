const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU9lRGorVFEvc2ZZbjdxRDJUMXdmVWh3STQydHdwc25XV0tRbXFOb1BtVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUJQWmNIYnN6di9rdWMyZVVOUkZ4cVBKbnR1L0hZSm5CR2ROazJPc2hqbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRlBITlYxa20vUVdXbld6OFBlbVhkWnFzZW5lQk1aOGMwbTJILzFaK1U0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSGJEaW1JaUE4NjZvOSsrcjd2b1Vhd1JQMXhiRG9MZmlLMWdlcUllMjE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVFOHFxL3Q5QzRReHlGZkVjODdQR3NkS01CclZMQnBLQWZsWk8rdGlmVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVsWC9VNUhOSTFDTDVUbDJHR1grMUxRUzFkaHBlbTd2aTJHeWFSMnhqQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEk3QzhtdWlieU9EUEpZakJmNjlUU3doZkxsT1JhTFd4M0JMQ250R3BHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0RpcTBncURIQ2FYSGtiME9mbXZkOUVST0Y3cmNTQVhWK3IzZ2RSWmdEUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImljTEt2Y1dvanptWXU1TmtBaGxCQWdyNlNmM2RJeGhIemdVeSthUURjdlA5dkUzSnpYL2FxaG0vYk9rNFlROVlzNUlNMXg5b1lGdDZFNXJVQkpnL0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6ImMzTTlWR1VDeFZzU2cyR0dkaWNPbkhSM0NMVFNGenR0WjUvblRkWlUyajA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjY4RGhIemE1VG9XY1RoN2ZJS2F3Y0EiLCJwaG9uZUlkIjoiNmZlMGU3NGItMTFkOC00ZWViLTkzZjMtNTI2MjEwODgwNjAzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFyb3huc1VMaGRtbi9GandRa2RQSjVrcFUycz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0UXR0RHhvWXl5cThSU3hSUnhRSDRSKzQ0MEE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOENXWkhBQTgiLCJtZSI6eyJpZCI6IjIzNDkxMzQ0NTc1MDk6NDdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ptbmg2RUNFT0ttMDdvR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitKdUFvZDdYYkcvc2RPYWVCQlpxdmcwdzRPcUpQQVZSb1lXRi8zZ29LMXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJ6M1djd2hGN2Z4WlpnMHExU01BTkEvc2J2dWRuaEI3bGpzQlFqQXRjUW8yTWlDWjY3aGwrcGZCUkhmNDVpaDk3aXN0clMxL0RMMkdweTBuaVU4dkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxTEJwYy85Rm5FUEQ4alkvT1djd3UwSWJSbmx5ODl6QnF6L0hPN0ZwazBpQmVGaXJsU2Y1SEdydjlTQW94bVI2RDVpeWd5OFBwYVIweEluTVc0RytCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxMzQ0NTc1MDk6NDdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmliZ0tIZTEyeHY3SFRtbmdRV2FyNE5NT0RxaVR3RlVhR0ZoZjk0S0N0YyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzYxMjQwMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCMjUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "king johan",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349134457509",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'TOJI MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/CbFHScz/6p.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
