import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
import path from 'path';

// Path to the credentials.json file
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials2.json')
const TOKEN_PATH = path.join(process.cwd(), 'token.json')

// Scopes required to access Google Drive
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function authorize() {
  const content = fs.readFileSync(CREDENTIALS_PATH);
  console.log(JSON.parse(content));
  const {web} = JSON.parse(content);
  console.log(web);
  const { client_secret, client_id, redirect_uris } = web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const code = await new Promise((resolve) => {
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        resolve(code);
      });
    });
    const tokenResponse = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokenResponse.tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenResponse.tokens));
    console.log('Token stored to', TOKEN_PATH);
  }
  return oAuth2Client;
}

async function uploadFile(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const filePath = 'path/to/your/file.pdf';
  const fileName = 'uploaded_file.pdf';

  const fileMetadata = {
    name: fileName,
  };
  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(filePath),
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('File Id:', file.data.id);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

(async () => {
  try {
    const auth = await authorize();
    await uploadFile(auth);
  } catch (error) {
    console.error('Error during authentication or file upload:', error);
  }
})();
