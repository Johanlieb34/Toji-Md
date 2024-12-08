const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVB6SVVFcGIrYzNwT3Y1cVBra1YvVUJ0VGw5SDMvbFNaRXZZV25JZ3pYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQW51YmdiU2VKOHZPc2VmY2xYbmhiZ2FxMjVXeDZkRjl3SjFUTGlpb2RqRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQmhobGxnKzRBbTdnUzJoUlZQbXZNeVhRNEhmVlhoeTVsTmV0SHZRODBnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJueUpJeW1sbVF4QXZjb3A0RlYvbTE3TTNEWXJlZ2xDUjF1L1loUGZJZXpZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNLVVJyLzZtUlVjcGtTcDBxZ3FkazRqb1lzT3dwK0ZJNTNYRXNTNUJnR0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBrbDBZWDdqWC9XMGcvd3czRFgwVTlYMFpFL2VndTNKak5oc2dZQS9qelE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk9zbi9lN1lYSFhQZEJoNjU0OTZVK0t0OFF1Z0V0NStPRHkwUnZhdmxrYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmhwcVB4S0Z6M2lPdjVRRitRVk4ydjExWURCL0ZJUnJZS1Z5aDhUQjFCST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhudkY2aTczeWI0aDlMcGtHRkl4aTNQM2Q5S0JqdTIzMExwOHVocFo1S3M4RnVKNmUva1c0RCtqcVRheXA1dnVjZTltdlFoWVBzZDZrd0h3bmllVUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJKRUQ0ZDZzTTYzSGxVa1QrNnVwNHIzZUxQQXA5cVh6dHNxZHlkNFZRVlR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJpWXh5eTgzM1FuMm44bGRmOXNWVWhRIiwicGhvbmVJZCI6ImIxNjRmZTk0LTM1MjItNDljOC05Mjc0LTJkMDg0OWM5NmIyYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpMnhEcDRjcGVWTVZBWWZZVDBQdTJNT2xEd0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjlBaGgvUmRWZVRUOGsyRXJHS041UkhEV01RPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkM5WTRGM0JIIiwibWUiOnsiaWQiOiIyMzQ5MTM0NDU3NTA5OjQ5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKbW5oNkVDRUs3dDE3b0dHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrSnVBb2Q3WGJHL3NkT2FlQkJacXZnMHc0T3FKUEFWUm9ZV0YvM2dvSzF3PSIsImFjY291bnRTaWduYXR1cmUiOiJ2NlZ4QUw2SUhzbklRaXhhK255NXJRMzlRZ1hZQk1ZZU5TWitmZWtrcldhSFhtVk1mcEorRUpWWTZWYUxjQktBR25GV1NEZWlDVHV6Q1h2NUVIM2VCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNHN3ZGEzWXNQd29MMzJmWlNXdHZyMnJTU0tHZlYyekV1Zk1YQ3RObDdQQ1QwRTM0MU5WcDZPVjFzMGxrZmFKOE96V0dXWGFSc3crU0pmd3JNWHljQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTM0NDU3NTA5OjQ5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZpYmdLSGUxMnh2N0hUbW5nUVdhcjROTU9EcWlUd0ZVYUdGaGY5NEtDdGMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzM2ODY5NzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQjI1In0=',
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
