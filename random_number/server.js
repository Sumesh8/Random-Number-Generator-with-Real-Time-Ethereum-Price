// Import necessary modules
const express = require('express');
const cors = require("cors");
// Create Express application
const port = 5000;

const axios = require('axios');
//Define route to get temperature for a location
// app.get('/api/random', async (req, res) => {
    
//     const location = 'colombo';
//     const lat = 6.9271;
//     const lon = 79.8612;

//     // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
//     const apiKey = '8c6fab8ac3acfd28d1fac14bf6f62685';
//     //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
//     const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    
//     try {
//         // Send GET request to the OpenWeatherMap API
//         console.log(apiUrl);
//         const response = await axios.get(apiUrl);
//         // Extract temperature from the response data
//         console.log(response);
//         const temperature = response.data.main.temp;
//         res.json({ temperature });
//     } catch (error) {
//         console.error('Error fetching temperature:', error.message);
//         res.status(500).json({ error: 'Failed to fetch temperature' });
//     }
// });

const server = express();
server.use(cors());
server.use("/api", require("./Random-Number-Generator-with-Real-Time-Ethereum-Price/routes/index"));



// Start server
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});