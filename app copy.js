import express from 'express';
import fileUpload from 'express-fileupload';

import mongodb from 'mongodb';
import {MongoClient} from "mongodb";
import mongoose  from "mongoose";

import ejs from "ejs";
import lodash from "lodash";
import bodyParser from "body-parser";
import dotenv from 'dotenv/config';
import fs from 'fs';

import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import axios from "axios";
import cors from "cors";

import { PdfReader } from "pdfreader";

import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';

const port = process.env.PORT || 3000;

// dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileUpload());
app.use(cors());

app.use(session({
    secret: "navaneethjainsl",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

/////////////////////////////////////////////////////////Firebase/////////////////////////////////////////////////////////
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
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


/////////////////////////////////////////////////////////Gemini/////////////////////////////////////////////////////////

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


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

/////////////////////////////////////////////////////////Login / Signup/////////////////////////////////////////////////////////

// app.get("/login", (req, res) =>{
//     res.send("Login");
// });

// app.post("/login", async (req, res) =>{
//     const data = req.body;
//     console.log("data");
//     console.log(data);
    
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
//     const usersRef = collection(dbf, "users");
//     const q = query(usersRef, where("username", "==", req.body.username + ""), where("password", "==", hashedPassword));
//     const userSnap = await getDocs(q);
    
//     let userData;
//     userSnap.forEach(async (doc) => {
//         userData = doc.data();

//         // console.log("userData");
//         // console.log(userData);

//         res.json({success: true});
//     });
    
//     res.json({success: false, message: "Username or password incorrect"});
// });

app.post('/login', passport.authenticate('local', {
    successRedirect: '/successRedirect',
    failureRedirect: '/failureRedirect',
    failureFlash: false
}));

app.get('/successRedirect', (req, res) => {
    res.json({success: true});
});

app.get('/failureRedirect', (req, res) => {
    res.json({success: false, message: "Username or password incorrect"});
});

// app.get("/signup", (req, res) =>{
//     res.send("Signup")
// });

app.post("/signup", async (req, res) =>{
    // const data = req.body;
    // console.log("data");
    // console.log(data);

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPassword = req.body.confirmPassword;
    if(password !== confirmPassword){
        res.status(401).json({success: false, message: "Passwords dont match"});
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
        dob: req.body.dob,
        phno: req.body.phno,
        password: hashedPassword,
    });

    const userRef = collection(dbf, req.body.username);
    await setDoc(doc(userRef, "notes"), {});

    // console.log("usersRef");
    // console.log(usersRef);
    // res.redirect("/login");
    res.status(200).json({success: true});
    
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

/////////////////////////////////////////////////////////home/////////////////////////////////////////////////////////

app.get('/home',async (req, res) => {
    // const username = req.body.username;
    const username = "navaneethjainsl";

    const querySnapshot = await getDocs(collection(dbf, username));
    let docs = {};
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        docs[doc.id]= doc.data();
    });
    
    console.log(Object.values(docs.notes));

    res.json({success: true, files: Object.values(docs.notes)});
});

app.post('/pdfSummary', async (req, res, next) => {
    const url = req.body.url;
    console.log(url);
    
    try {
        // const allText = await readPDF('public/pdfs/IDS.pdf');
        const allText = await readPDF(url);
        // res.send(allText);
        // res.json({success: true, content: allText});
        
        const prompt = "Give me a summary of this"
        const result = await model.generateContent(prompt + allText);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.json({success: true, summary: text});
    } catch (err) {
        console.error('Error reading PDF:', err);
        // res.status(500).send('Error processing PDF'); // Handle errors gracefully
        res.json({success: false, message: "Error processing PDF"});
    }
});

app.post('/pdfText', async (req, res, next) => {
    const url = req.body.url;
    console.log(url);

    try {
        // const allText = await readPDF('public/pdfs/IDS.pdf');
        const allText = await readPDF(url);
        // res.send(allText);
        res.status(200).json({success: true, content: allText});
    } catch (err) {
        console.error('Error reading PDF:', err);
        // res.status(500).send('Error processing PDF'); // Handle errors gracefully
        res.status(500).json({success: false, message: "Error processing PDF"});
    }
});

async function readPDF(firebaseUrl) {
    try {
        // Fetch the PDF file from Firebase Storage
        const response = await axios.get(firebaseUrl, {
            responseType: 'arraybuffer'  // Ensure response is treated as binary data
        });

        // Parse the PDF content
        const buffer = Buffer.from(response.data);  // Convert arraybuffer to Buffer
        const allText = await parsePDF(buffer);    // Parse PDF and get all text

        return allText;
    } catch (error) {
        throw new Error(`Failed to read PDF: ${error.message}`);
    }
}

function parsePDF(buffer) {
    return new Promise((resolve, reject) => {
        const allText = [];  // Array to store all extracted text
        new PdfReader().parseBuffer(buffer, (err, item) => {
            if (err) {
                reject(err);  // Reject the promise if there's an error
            } else if (!item) {
                resolve(allText.join('\n'));  // Resolve with all text joined by newline on EOF
            } else if (item.text) {
                allText.push(item.text);  // Append text to the array
            }
        });
    });
}

// function readPDF(filePath) {
//     return new Promise((resolve, reject) => {
//       const allText = []; // Array to store all extracted text
//       new PdfReader().parseFileItems(filePath, (err, item) => {
//         if (err) {
//           reject(err); // Reject the promise if there's an error
//         } else if (!item) {
//           resolve(allText.join('\n')); // Resolve with all text joined by newline on EOF
//         } else if (item.text) {
//           allText.push(item.text); // Append text to the array
//         }
//       });
//     });
// }

app.get('/upload' , async (req, res) => {
    res.render('upload');
});

app.post("/upload", async (req, res) => {
    // const username = req.body.username;
    const username = "navaneethjainsl";
    
    console.log("req.body");
    console.log(req.body);
    console.log("req.files");
    console.log(req.files);
    console.log("req.file");
    console.log(req.file);

    if(req.files){
        const file = req.files.file;
    
        const fileRef = ref(storage, `${username}/${file.name}`);
        // const filesRef = ref(storage, 'mountains.jpg');
    
        const metadata = {
            contentType: file.mimetype,
        };
        
        console.log("file");
        console.log(file);
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
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);

                    const fileName = file.name;
                    const usersRef = collection(dbf, username);
                    
                    await updateDoc(doc(usersRef, "notes"), {
                        [file.name.substring(0, fileName.indexOf('.'))]: {
                            name: file.name,
                            mimetype: file.mimetype,
                            link: downloadURL,
                            size: file.size,
                            messages: [{
                                role: "user",
                                content: "what is Linear Regression?",
                            }],
                        }
                    });

                    // Later Version: to append without reading -> 
                    // notes: firebase.firestore.FieldValue.arrayUnion(...newData.notes) , where newData = note:{notes: []}
                    
                    // res.status(200).json({success: true, downloadURL: downloadURL, file: file});
                    res.status(200).json({success: true, downloadURL: downloadURL});
                });
            }
        );
    
        
    }

    
    // res.redirect('/upload');
});

app.post("/chatPdf/upload", async (req, res) => {
    // const file = req.files.file;
    console.log(req.body);
    const url = req.body.url;
    const mimetype = req.body.mimetype;
    
    const config = {
        headers: {
          "x-api-key": process.env.CHATPDF_API_KEY,
          "Content-Type": mimetype,
        },
    };
    
    const data = {
        url: url,
    }
    
    axios
    .post("https://api.chatpdf.com/v1/sources/add-url", data, config)
    .then((response) => {
        console.log("Source ID:", response.data.sourceId);
        res.status(200).json({success: true, sourceId: response.data.sourceId});
    })
    .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
        res.status(200).json({success: false, message: error});
    });
});

app.get("/chatPdf/chat", async (req, res) => {
    console.log(req.query);

    const username = "navaneethjainsl";
    
    // const url = req.body.url;
    const fileName = req.query.fileName;
    const mimetype = req.query.mimetype;
    const sourceId = req.query.sourceId;
    const userMessage = req.query.message;

    const usersRef = collection(dbf, username);

    await updateDoc(doc(usersRef, "notes"), {
        'IDS.messages': arrayUnion({
            role: "user",
            content: userMessage,
        })
    });

    const querySnapshot = await getDocs(usersRef);
    let docs = {};
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        docs[doc.id]= doc.data();
    });

    const messages = docs["notes"][fileName]["messages"];
    console.log("messages")
    console.log(messages)
    
    const config = {
        headers: {
          "x-api-key": process.env.CHATPDF_API_KEY,
          "Content-Type": mimetype,
        },
    };

    const data = {
        sourceId: sourceId,
        messages: messages,
    };
    
    axios
    .post("https://api.chatpdf.com/v1/chats/message", data, config)
    .then((response) => {
        console.log("Result:", response.data.content);
        res.json({success: true, message: response.data.content});
    })
    .catch((error) => {
        console.error("Error:", error.message);
        console.log("Response:", error.response.data);
        res.json({success: false, message: error});
    });

    // const config = {
    //     headers: {
    //         "x-api-key": process.env.CHATPDF_API_KEY,
    //         "Content-Type": "application/json",
    //     },
    //     responseType: "stream",
    // };

    // const data = {
    //     stream: true,
    //     sourceId: "src_Ow0hS4Hgug0UDCy0rnsse",
    //     messages: [
    //       {
    //         role: "user",
    //         content: "what is Linear Regression?",
    //       },
    //     ],
    // };
});

app.get('/displayPdf', (req, res) => {
    console.log(req.params.fileName)
    // const fileName = req.params.fileName;
    const fileName = "Report%20Format%20EVS.docx";
    
    // res.redirect(`https://firebasestorage.googleapis.com/v0/b/student-sync-nie.appspot.com/o/navaneethjainsl%2F${fileName}.pdf?alt=media&token=d7e2958a-6a1b-462b-9614-d51c073be6d3`)
    res.json({success: true, url:`https://firebasestorage.googleapis.com/v0/b/student-sync-nie.appspot.com/o/navaneethjainsl%2F${fileName}.pdf?alt=media`})
});

/////////////////////////////////////////////////////////Announcements/////////////////////////////////////////////////////////

app.get('/announcements', function(req, res) {
    const announcements = [
        {
            topic: "PGCET Cut Off RANK 2023-24",
            link: "https://nie.ac.in/wp-content/uploads/2024/06/PGCET-CUT-OFF-RANK-2023-24.pdf",
            date: new Date().toLocaleDateString(),
        },
        {
            topic: "DCET Cut Off RANK 2023-24",
            link: "https://nie.ac.in/wp-content/uploads/2024/06/DCET-CUT-OFF-RANK-FOR-2023-24.pdf",
            date: new Date().toLocaleDateString(),
        },
        {
            topic: "Provision for Improvement Test – Students of B.E. II, IV & VI Semester (AY 2023-24)",
            link: "https://nie.ac.in/wp-content/uploads/2024/06/Dean-AA_Circular_Even_26_14.06.2024.pdf",
            date: new Date().toLocaleDateString(),
        },
        {
            topic: "VI Semester Test 2 Time Table (2023-24)",
            link: "https://nie.ac.in/wp-content/uploads/2024/06/VIsem-test22023-24.pdf",
            date: new Date().toLocaleDateString(),
        },
    ];

    const notifications = [
        {
            topic: "TATA Steel - Queerious Season 3",
            link: "https://gradpartners.in/e/Queerious-Season-3-125",
            date: "25/06/2024",
        },
        {
            topic: "Lowe's India",
            link: "https://forms.gle/GEnXUqSe35B8oMbQ9",
            date: "21/06/2024",
        },
        {
            topic: "DCET Cut Off RANK 2023-24",
            link: "https://forms.gle/K2sSJuRdyohFHmn7A",
            date: "20/06/2024",
        },
        {
            topic: "Epicor",
            link: "https://forms.gle/8YS65wYza8QHgfox5",
            date: "12/06/24",
        },
    ];

    res.status(200).json({success: true, message: {college: announcements, placements: notifications}});
});

/////////////////////////////////////////////////////////Smash/////////////////////////////////////////////////////////

app.get("/smash", async (req, res) => {
    // const userRef = collection(dbf, "smash");
    // await setDoc(doc(userRef, "1"), {});
    
    res.render("upload");;
});

app.post("/smash", async (req, res) => {
    // const username = req.body.username;
    const username = "smash";
    const time = new Date().getTime();
    
    console.log("req.body");
    console.log(req.body);
    console.log("req.files");
    console.log(req.files);
    console.log("req.file");
    console.log(req.file);

    if(req.files){
        const file = req.files.file;

        const str = file.name + time;
        let hash;

        hash = Math.abs(str.charCodeAt());
        // for (const char of str) {
        //     hash ^= char.charCodeAt(0); // Bitwise XOR operation
        // }
    
        const fileRef = ref(storage, `${username}/${hash}`);
        // const filesRef = ref(storage, 'mountains.jpg');
    
        const metadata = {
            contentType: file.mimetype,
        };
        
        console.log("file");
        console.log(file);
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
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);

                    const fileName = file.name;
                    const usersRef = collection(dbf, username);
                    
                    await setDoc(doc(usersRef, hash.toString()), {
                        name: file.name,
                        mimetype: file.mimetype,
                        link: downloadURL,
                        size: file.size,
                        messages: [],
                    });

                    // Later Version: to append without reading -> 
                    // notes: firebase.firestore.FieldValue.arrayUnion(...newData.notes) , where newData = note:{notes: []}
                    
                    // res.status(200).json({success: true, downloadURL: downloadURL, file: file});
                    res.status(200).json({success: true, code: hash, downloadURL: downloadURL});
                });
            }
        );
    
        
    }

    
    // res.redirect('/upload');
});

app.get('/smash/:code',async (req, res) => {
    const code = req.params.code;
    console.log(code);

    const querySnapshot = await getDocs(collection(dbf, "smash"));
    let docs = {};
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        docs[doc.id]= doc.data();
    });

    console.log("docs");
    console.log(docs[code]["link"]);

    res.redirect(docs[code]["link"]);
})

/////////////////////////////////////////////////////////PDF Tools/////////////////////////////////////////////////////////

import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';

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


/////////////////////////////////////////////////////////GDrive/////////////////////////////////////////////////////////

import {GoogleAuth} from 'google-auth-library';
// import {google} from 'googleapis';
app.get('/drive/upload', (req, res)=>{
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
            console.log('File:', file.data);
            console.log('File Id:', file.data.id);
            res.json({success: true, fileId: file.data.id});
        } catch (error) {
            console.error('Error uploading file:', error);
            res.json({success: false, error: 'Error uploading file:'});
        }
    }

    (async () => {
    try {
        const auth = await authorize();
        await uploadFile(auth);
        // res.redirect("/end")
    } catch (error) {
        console.error('Error during authentication or file upload:', error);
    }
    })();

    
});

// req -> fileId
app.get('/drive/download', async (req, res) => {
    // const fileId = req.body.fileId;
    const fileId = "1dJWJP8kdoI6JbQD3KoYZdu33UJ8CUFa2";

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
    
    // const auth = new GoogleAuth({
    //     scopes: 'https://www.googleapis.com/auth/drive',
    // });
    const auth = await authorize();
    const service = google.drive({version: 'v3', auth});
    
    try {
        const file = await service.files.get({
            fileId: fileId,
            alt: 'media',
        });
        console.log(file.status);
        res.json({success: true, status: file});
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
})

app.get('/drive/preview', async (req, res) => {
    // const fileId = req.params.file;
    const fileId = "1dJWJP8kdoI6JbQD3KoYZdu33UJ8CUFa2";

    // res.json({success: true, redirect:`https://drive.google.com/file/d/${fileId}/view`});
    res.send(`<iframe id="inlineFrameExample" 
    title="Inline Frame Example" 
    width="300" 
    height="200" 
    src="https://drive.google.com/file/d/${fileId}/view"> 
    
    </iframe>`);
})

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


/////////////////////////////////////////////////////////GCalendar/////////////////////////////////////////////////////////

import readline from 'readline';
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

/////////////////////////////////////////////////////////Serialise or Deserialise/////////////////////////////////////////////////////////


passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {

        const usersRef = collection(dbf, "users");
        // const q = query(usersRef, where("username", "==", req.body.username + ""), where("password", "==", hashedPassword));
        const q = query(usersRef, where("username", "==", req.body.username + ""));
        const userSnap = await getDocs(q);
        
        if(!userSnap){
            return done(null, false, { message: 'Incorrect username.' });
        }
        
        let userData;
        userSnap.forEach(async (doc) => {
            userData = doc.data();

            // console.log("userData");
            // console.log(userData);

            res.json({success: true});
            const match = await bcrypt.compare(password, userData.password);
            if (match) {
              return done(null, userData);
            } else {
              return done(null, false, { message: 'Incorrect password.' });
            }
        });

      } catch (error) {
        return done(error);
      }
    }
  ));
  
  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
  passport.deserializeUser(async (username, done) => {
    try {
        const usersRef = collection(dbf, "users");
        // const q = query(usersRef, where("username", "==", req.body.username + ""), where("password", "==", hashedPassword));
        const q = query(usersRef, where("username", "==", req.body.username + ""));
        const userSnap = await getDocs(q);
        
        if(!userSnap){
            done(null, false);
        }
        
        let userData;
        userSnap.forEach(async (doc) => {
            userData = doc.data();

            done(null, userData);
        });
    } catch (error) {
        done(error);
    }
  });

/////////////////////////////////////////////////////////Listening/////////////////////////////////////////////////////////

app.listen(port, function () {
    console.log(`listening on ${port}`);
});