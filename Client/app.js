const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors package

dotenv.config();

const app = express();
const port = 3001;

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware to enable CORS

// POST /api/question endpoint
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

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Q&A app');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
