// Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmF2YW5lZXRoamFpbnNsQGdtYWlsLmNvbSIsIm5iZiI6IjE3MTY4Mjg5NzIiLCJleHAiOiIxNzQ4MzY0OTcyIn0.lg-ZCnsQCYqxfQttEkRQS5J_GF3ZVrsBGOAtIGNpJLs
// API Key: 3002a253-233c-4a6b-9a33-6c762ecedaba

const https = require('https');
const fs = require('fs');

// Create a new FormData object to handle the form data
const formData = new FormData();
formData.append("username", "navaneethjainsl@gmail.com");
formData.append("password", "Njppt7@Njppt7");
formData.append("key", "3002a253-233c-4a6b-9a33-6c762ecedaba");

// Define the options for the fetch request
const requestOptions = {
  method: 'POST',
  body: formData,          // Set the body of the request to the FormData object
  redirect: 'follow'       // Specify the redirect behavior
};

// Make a POST request to the authentication endpoint
let accessToken = ""
fetch("https://auth.powerpointgeneratorapi.com/v1.0/token/create", requestOptions)
  .then(response => response.text())    // Parse the response as text
  .then(result => {
      accessToken = JSON.parse(result).result.access_Token
      console.log(accessToken)
  }) // Log the result to the console
  .catch(error => console.error('Error:', error)); // Log any errors that occur



  
// const jsonData = {
// presentation: {
//     template: "url of title_slide_template.pptx",
//     export_version: "Pptx2010",
//     resultFileName: "quick_start_example",
//     slides: [
//     {
//         type: "slide",
//         slide_index: 0,
//         shapes: [
//         { name: "Title 1", content: "Your generated PowerPoint presentation" },
//         { name: "Subtitle 2", content: "Create, fill and manage PowerPoint documents through simple API requests." }
//         ]
//     }
//     ]
// }
// };

// // Append the JSON data to the FormData instance
// formData.append("jsonData", JSON.stringify(jsonData));

// // Define the API endpoint and your token
// const url = "https://gen.powerpointgeneratorapi.com/v1.0/generator/create";
// const token = "your_token_here"; // Replace with your actual token

// // Prepare the request options
// const options = {
// hostname: 'gen.powerpointgeneratorapi.com',
// path: '/v1.0/generator/create',
// method: 'POST',
// headers: {
//     ...formData.getHeaders(),
//     'Authorization': `Bearer ${token}`
// }
// };

// // Make the POST request
// const req = https.request(options, (res) => {
// let data = [];

// // Collect response data
// res.on('data', (chunk) => {
//     data.push(chunk);
// });

// // Handle the end of the response
// res.on('end', () => {
//     if (res.statusCode === 200) {
//     const buffer = Buffer.concat(data);
//     fs.writeFileSync('generated.pptx', buffer);
//     console.log('PowerPoint presentation generated and saved as generated.pptx');
//     } else {
//     console.error(`Failed to generate presentation. Status code: ${res.statusCode}`);
//     console.error(`Response: ${Buffer.concat(data).toString()}`);
//     }
// });
// });

// // Handle request errors
// req.on('error', (error) => {
// console.error('Error during request:', error);
// });

// // Send the form data
// formData.pipe(req);
