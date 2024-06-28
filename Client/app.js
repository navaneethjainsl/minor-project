const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch'); // Import fetch for fetching PDF files

dotenv.config();

const app = express();
const port = 3001;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(bodyParser.json());
app.use(cors());

app.post('/api/question', async (req, res) => {
  const { question } = req.body;

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I have 2 dogs in my house." }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(question);
    const response = await result.response;
    const text = response.text();
    res.json({ answer: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Q&A app');
});

app.get('/pdfSummary', async (req, res) => {
  const { pdfUrl } = req.query;

  try {
    const allText = await readPDF(pdfUrl);
    const prompt = "Give me a summary of this ";
    const result = await model.generateContent(prompt + allText);
    const response = await result.response;
    const summary = response.text();
    res.json({ success: true, summary });
  } catch (err) {
    console.error('Error reading PDF:', err);
    res.status(500).json({ success: false, message: "Error processing PDF" });
  }
});

app.get('/pdfText', async (req, res) => {
  const { pdfUrl } = req.query;

  try {
    const allText = await readPDF(pdfUrl);
    res.status(200).json({ success: true, content: allText });
  } catch (err) {
    console.error('Error reading PDF:', err);
    res.status(500).json({ success: false, message: "Error processing PDF" });
  }
});

async function readPDF(pdfUrl) {
  const { PdfReader } = await import('pdfreader');

  // Check if the URL is absolute
  if (!/^https?:\/\//i.test(pdfUrl)) {
    throw new Error("Only absolute URLs are supported");
  }

  return new Promise((resolve, reject) => {
    const allText = [];
    fetch(pdfUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        new PdfReader().parseBuffer(buffer, (err, item) => {
          if (err) {
            reject(err);
          } else if (!item) {
            resolve(allText.join('\n'));
          } else if (item.text) {
            allText.push(item.text);
          }
        });
      })
      .catch(reject);
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
