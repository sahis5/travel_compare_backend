const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/compare', (req, res) => {
  const { from, to, date } = req.query;

  console.log("Compare request:", { from, to, date });

  const dummyData = [
    { mode: "Bus", provider: "RedBus", price: 850, time: "10h 15m" },
    { mode: "Train", provider: "IRCTC", price: 620, time: "8h 30m" },
    { mode: "Flight", provider: "IndiGo", price: 2200, time: "2h 5m" }
  ];

  res.json({ results: dummyData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
