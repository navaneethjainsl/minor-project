import express from 'express';
import fileUpload from 'express-fileupload';
import mongodb from 'mongodb';
import {MongoClient} from "mongodb";
import mongoose  from "mongoose";
import ejs from "ejs";
import lodash from "lodash";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import dotenv from 'dotenv/config';
import fs from 'fs';

import { PdfReader } from "pdfreader";



import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';

import path from 'path';
import process from 'process';
import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = process.env.PORT || 5000;

// dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileUpload());

app.use(session({
    secret: "navaneethjainsl",
    resave: false,
    saveUninitialized: false,
}));

/////////////////////////////////////////////////////////Firebase/////////////////////////////////////////////////////////
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs, doc, setDoc, query, where , orderBy } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const appf = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const dbf = getFirestore(appf);
const storage = getStorage();


/////////////////////////////////////////////////////////Mongodb/////////////////////////////////////////////////////////
let uri = process.env.URI;
const dbm = mongoose.connect(uri, {useNewUrlParser: true});


/////////////////////////////////////////////////////////ILovePDF/////////////////////////////////////////////////////////
const ilovepdf = new ILovePDFApi(
    process.env.ILOVEPDF_PUBLIC_KEY,
    process.env.ILOVEPDF_SECRET_KEY, 
    {
        file_encryption_key: process.env.ILOVEPDF_FILE_ENCRYPTION_KEY,
    }
);


/////////////////////////////////////////////////////////Routings/////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) =>{
    res.send("Login");
});

app.post("/login", async (req, res) =>{
    const data = req.body;
    console.log("data");
    console.log(data);
    
    const usersRef = collection(dbf, "users");
    const q = query(usersRef, where("username", "==", req.body.username + ""), where("password", "==", req.body.password));
    const userSnap = await getDocs(q);
    
    let userData;
    userSnap.forEach(async (doc) => {
        userData = doc.data();

        // console.log("userData");
        // console.log(userData);
        // res.send(userData);

        res.send("Login Successful");
        // Success redirect
        res.redirect("/login"); 
    });
    // console.log("userData");
    // console.log(userData);
    
    // res.send("Login Unsuccessful");

    // Failure redirect
    res.redirect("/login");
});

app.get("/signup", (req, res) =>{
    res.send("Signup")
});

app.post("/signup", async (req, res) =>{
    // const data = req.body;
    // console.log("data");
    // console.log(data);

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(password !== confirmPassword){
        res.status(401).send("Passwords dont match");
    }

    // const usersCol = collection(dbf, 'users');
    // const usersRef = ref.child('users');
    // usersRef.set();
    
    const usersRef = collection(dbf, "users");
    await setDoc(doc(usersRef, req.body.username), {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        collegeEmail: req.body.collegeEmail,
        usn: req.body.usn,
        password: req.body.password,
    });

    const userRef = collection(dbf, req.body.username);
    await setDoc(doc(userRef, "notes"), {});

    // console.log("usersRef");
    // console.log(usersRef);
    res.redirect("/login");
    
});

app.get('/upload' , async (req, res) => {
    res.render('upload');
});

app.post("/upload", async (req, res) => {
    console.log("req.body");
    console.log(req.body);
    console.log("req.files");
    console.log(req.files);
    console.log("req.file");
    console.log(req.file);

    if(req.files){
        const file = req.files.file;
    
        const fileRef = ref(storage, `uploads/${file.name}`);
        // const filesRef = ref(storage, 'mountains.jpg');
    
        const metadata = {
            contentType: file.mimetype,
        };
        
        console.log("file.name");
        console.log(file.name);
        console.log("file.mimetype");
        console.log(file.mimetype);
        console.log("file.data");
        console.log(file.data);
    
        // 'file' comes from the Blob or File API
        const uploadTask = uploadBytesResumable(fileRef, file.data, metadata)
    
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                });
            }
        );
    
        
    }
    res.redirect('/upload');
});

app.get('/pdfToText', async (req, res, next) => {

    // new PdfReader().parseFileItems("public/pdfs/IDS.pdf", (err, item) => {
    //     if (err) console.error("error:", err);
    //     else if (!item) console.warn("end of file");
    //     else if (item.text) {
    //         console.log(item.text)
    //     };
    //     res.send(item.text)
    // });

    function readPDF(filePath) {
        return new Promise((resolve, reject) => {
          const allText = []; // Array to store all extracted text
          new PdfReader().parseFileItems(filePath, (err, item) => {
            if (err) {
              reject(err); // Reject the promise if there's an error
            } else if (!item) {
              resolve(allText.join('\n')); // Resolve with all text joined by newline on EOF
            } else if (item.text) {
              allText.push(item.text); // Append text to the array
            }
          });
        });
    }
    try {
        const allText = await readPDF('public/pdfs/IDS.pdf');
        res.send(allText);
    } catch (err) {
        console.error('Error reading PDF:', err);
        res.status(500).send('Error processing PDF'); // Handle errors gracefully
    }
 
});

app.get("/ilovepdf/merge", async (req, res)=>{
    

    // Choose your processing tool and create a new task
    const task = ilovepdf.newTask('merge');

    task.start()
    .then(() => {
        return task.addFile('https://firebasestorage.googleapis.com/v0/b/student-sync-nie.appspot.com/o/uploads%2FIDS.pdf?alt=media&token=878a4e41-fad7-4237-b9c6-7c796e8fd064');
    })
    .then(() => {
        return task.addFile('https://firebasestorage.googleapis.com/v0/b/student-sync-nie.appspot.com/o/uploads%2FIDS.pdf?alt=media&token=878a4e41-fad7-4237-b9c6-7c796e8fd06');
    })
    .then(() => {
        return task.process();
    })
    .then(() => {
        return task.download();
    })
    .then((data) => {
        fs.writeFileSync('./public/pdfs/IDS.pdf', data);
    });

        
});

app.get('/drive', (req, res)=>{
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
        }
        else {
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
            console.log(tokenResponse)
            oAuth2Client.setCredentials(tokenResponse.tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenResponse.tokens));
            console.log('Token stored to', TOKEN_PATH);
        }
        return oAuth2Client;
    }

    async function uploadFile(auth) {
        const drive = google.drive({ version: 'v3', auth });
        const filePath = './public/pdfs/IDS.pdf';
        const fileName = 'IDS.pdf';

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
        res.redirect("/end")
    } catch (error) {
        console.error('Error during authentication or file upload:', error);
    }
    })();


});

app.get('/end', (req, res)=>{
    res.send("Success");
})

app.get('/oauth2callback', (req, res) => {
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials2.json')
    const TOKEN_PATH = path.join(process.cwd(), 'token.json')

    // Scopes required to access Google Drive
    const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
    
    const code = req.query.code;
    const content = fs.readFileSync(CREDENTIALS_PATH);
    console.log(JSON.parse(content));
    const {web} = JSON.parse(content);
    console.log(web);
    const { client_secret, client_id, redirect_uris } = web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return res.status(400).send('Error retrieving access token');
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      res.send('Authentication successful! You can close this window.');
    });
});


// import { google } from 'googleapis';
import readline from 'readline';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv/config';

app.get('/google/authorize', async (req, res) => {
    const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function authorize() {

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
})

app.get('/googleCalendar', async (req, res) => {
    console.log('googleCalendar')
    const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

    /**
     * Reads previously authorized credentials from the save file.
     *
     * @return {Promise<OAuth2Client|null>}
     */
    async function loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    /**
     * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
     *
     * @param {OAuth2Client} client
     * @return {Promise<void>}
     */
    async function saveCredentials(client) {
        const content = await fs.readFile(CREDENTIALS_PATH);
        // const content = process.env.GOOGLE_CALENDAR_CREDENTIALS;
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);
    }

    /**
     * Load or request or authorization to call APIs.
     *
     */
    async function authorize() {
        let client = await loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
            // keyfilePath: process.env.GOOGLE_CALENDAR_CREDENTIALS,
        });
        if (client.credentials) {
            await saveCredentials(client);
        }
        return client;
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    async function listEvents(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        const res = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = res.data.items;
        if (!events || events.length === 0) {
            console.log('No upcoming events found.');
            return;
        }
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
        });
    }

    authorize().then(listEvents).catch(console.error);
});

app.get('/googleResponse', async (req, res) => {
    console.log('Got googleResponse');
    console.log(req.params);
});

app.listen(port, function () {
    console.log(`listening on ${port}`);
});