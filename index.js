const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/compare', (req, res) => {
  const { from, to, date } = req.query;

  console.log("Incoming Request:", { from, to, date });

  // Randomized dummy data
  const dummyData = [
    {
      mode: "Bus",
      provider: "KSRTC",
      price: Math.floor(Math.random() * 500) + 500,
      time: `${Math.floor(Math.random() * 2) + 9}h ${Math.floor(Math.random() * 60)}m`
    },
    {
      mode: "Train",
      provider: "IRCTC",
      price: Math.floor(Math.random() * 300) + 400,
      time: `${Math.floor(Math.random() * 2) + 7}h ${Math.floor(Math.random() * 60)}m`
    },
    {
      mode: "Flight",
      provider: "IndiGo",
      price: Math.floor(Math.random() * 2000) + 2000,
      time: `${Math.floor(Math.random() * 1) + 2}h ${Math.floor(Math.random() * 60)}m`
    }
  ];

  res.json({ results: dummyData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
