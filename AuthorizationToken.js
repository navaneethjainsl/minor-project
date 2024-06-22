import { google } from 'googleapis';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv/config';

// Path to the credentials.json file
// const CREDENTIALS_PATH = 'credentials.json';

// Scopes required to access Google Drive
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function authorize() {
//   const content = fs.readFileSync(CREDENTIALS_PATH);
//   const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;

    const client_secret = process.env.GOOGLE_CALENDAR_CREDENTIALS_client_secret
    const client_id = process.env.GOOGLE_CALENDAR_CREDENTIALS_client_id
    const redirect_uris = process.env.GOOGLE_CALENDAR_CREDENTIALS_redirect_uris

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    rl.question('Enter the code from that page here: ', (code) => {
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync('token.json', JSON.stringify(token));
        console.log('Token stored to', 'token.json');
        rl.close();
        });
    });
}

authorize();
