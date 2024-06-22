import axios from 'axios';

const API_KEY = 'process.env.GOOGLE_API_KEY'; // Replace with your API key
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your access token

const config = {
  method: 'post',
  url: `https://www.googleapis.com/drive/v3/files?key=${API_KEY}`,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  data: {}, // The body of the POST request
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.error(error);
});
