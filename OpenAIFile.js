import https from 'https';
import dotenv from 'dotenv/config';

// Replace with your actual OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

// Replace with the desired endpoint URL
const endpoint = 'https://api.openai.com/v1/files';

// Data to be sent in the request body (optional for Files API)
const data = {
  // ... your file data here (if applicable)
};

const options = {
  hostname: new URL(endpoint).hostname,
  port: 443,
  path: '/openai/files?api-version=2024-02-01',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Assuming JSON data
    'Authorization': `Bearer ${apiKey}`,
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

if (Object.keys(data).length > 0) {
  // Send data only if it's not an empty object
  req.write(JSON.stringify(data));
}

req.end();
