const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const API_KEY = '3b53df19ac465bdb64ca9076e2817403'; // Replace this

app.get('/compare', async (req, res) => {
  const { from, to, date } = req.query;

  console.log("Compare Request Received:", { from, to, date });

  try {
    const response = await axios.get(
      `https://indianrailapi.com/api/v2/TrainBetweenStation/apikey/${API_KEY}/from/${from}/to/${to}/date/${date}/`
    );

    console.log("Raw API response:", response.data); // ADD THIS LINE

    const trains = response.data.Trains || [];

    const formatted = trains.map(train => ({
      mode: 'Train',
      provider: 'IRCTC',
      price: Math.floor(Math.random() * 500) + 300,
      time: `${train.DepartureTime} - ${train.ArrivalTime}`
    }));

    res.json({ results: formatted });

  } catch (err) {
    console.error("Rail API error:", err.message);
    res.status(500).json({ results: [] });
  }
});
