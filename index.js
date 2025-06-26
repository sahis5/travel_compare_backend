const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/compare', async (req, res) => {
  const { from, to, date } = req.query;

  try {
    const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v3/getLiveStation',
  params: {
    stationCode: 'NDLS',  // or use from req.query.from
    hours: '3'
  },
  headers: {
    'X-RapidAPI-Key': 'c46d307968msh7acaf27e7c74dfbp1da479jsn3c240194bf6b',  // use your actual key
    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  }
};


    const response = await axios.request(options);
    const trains = response.data.trains || response.data.data || [];


    if (!trains) return res.json({ results: [] });

    const results = trains.map(train => ({
      mode: "Train",
      provider: "IRCTC",
      price: Math.floor(Math.random() * 700 + 100), // Dummy price
      time: `${train.train_number} - ${train.train_name}`
    }));

    res.json({ results });

  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ results: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
