const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const API_KEY = '3b53df19ac465bdb64ca9076e2817403'; // Replace this

app.get('/compare', async (req, res) => {
  const { from, to, date } = req.query;

  console.log("Compare request:", { from, to, date });

  try {
    const response = await axios.get(`https://api.railwayapi.com/v2/between/source/${from}/dest/${to}/date/${date}/apikey/${API_KEY}/`);

    const trains = response.data.trains || [];

    const formattedData = trains.map(train => ({
      mode: "Train",
      provider: "IRCTC",
      price: Math.floor(Math.random() * 500) + 300, // You can replace with real fare API later
      time: `${train.src_departure_time} - ${train.dest_arrival_time}`
    }));

    res.json({ results: formattedData });
  } catch (err) {
    console.error("Train API error:", err.message);
    res.status(500).json({ results: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
