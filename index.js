const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/compare', async (req, res) => {
  const { from, to } = req.query;

  console.log("Incoming Request:", { from, to }); // For debugging

  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: '5ace3deb2d506cc8ae9776275e497978', // ⬅️ Put your real key here
        dep_iata: from,             // e.g., BLR
        arr_iata: to                // e.g., DEL
      }
    });

    console.log("Aviationstack API RAW RESPONSE:", response.data);

    const flights = response.data.data || [];

    const results = flights.slice(0, 10).map(flight => ({
      mode: "Flight",
      provider: flight.airline?.name || "Unknown Airline",
      price: Math.floor(Math.random() * 4000) + 3000, // Dummy random price
      time: flight.departure?.estimated || "N/A"
    }));

    res.json({ results });

  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ error: "Something went wrong while fetching flight data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
