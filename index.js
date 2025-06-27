app.get('/compareFlights', async (req, res) => {
  const { from, to } = req.query;

  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: '5ace3deb2d506cc8ae9776275e497978',
        dep_iata: from,
        arr_iata: to
      }
    });

    console.log("Aviationstack response:", response.data);

    const flights = response.data.data || [];

    const results = flights.map(flight => ({
      mode: "Flight",
      provider: flight.airline.name,
      price: Math.floor(Math.random() * 4000) + 3000, // dummy price
      time: `${flight.departure.estimated || "N/A"}`
    }));

    res.json({ results });

  } catch (err) {
    console.error("Aviationstack API error:", err.message);
    res.status(500).json({ results: [] });
  }
});
