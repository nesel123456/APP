const express = require("express");
const app = express();
const mysql = require("mysql2");
const pool = require("./db"); // Connectiong pool with the db
const PORT = 3000;

app.use(express.json());

// Main page
app.get("/", (req, res) => {
  res.send("API работает!");
});

// Getting locations with reviews 
app.get("/locations", async (req, res) => {
  try {
    const [locations] = await pool.query("SELECT * FROM locations");
    const locationsWithReviews = await Promise.all(locations.map(async (location) => {
      const [reviews] = await pool.query("SELECT * FROM reviews WHERE location_id = ?", [location.id]);
      location.reviews = reviews;
      return location;
    }));
    res.json(locationsWithReviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка при получении локаций");
  }
});

// Getting locations with using  ID
app.get("/locations/:id", async (req, res) => {
  const locationId = req.params.id;
  try {
    const [location] = await pool.query("SELECT * FROM locations WHERE id = ?", [locationId]);
    if (!location.length) {
      return res.status(404).send("Локация не найдена");
    }
    const [reviews] = await pool.query("SELECT * FROM reviews WHERE location_id = ?", [locationId]);
    location[0].reviews = reviews;
    res.json(location[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка при получении локации");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

