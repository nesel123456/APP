const express = require("express");
const client = require("./db"); // Используем клиент из db.js
const app = express();
const PORT = 3000;

app.use(express.json());

// Главная страница
app.get("/", (req, res) => {
  res.send("API работает!");
});

// Получение локаций с отзывами
app.get("/locations", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM locations");
    const locations = result.rows;

    const locationsWithReviews = await Promise.all(locations.map(async (location) => {
      const reviewResult = await client.query("SELECT * FROM reviews WHERE location_id = $1", [location.id]);
      location.reviews = reviewResult.rows;
      return location;
    }));

    res.json(locationsWithReviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка при получении локаций");
  }
});

// Получение локации по ID
app.get("/locations/:id", async (req, res) => {
  const locationId = req.params.id;
  try {
    const result = await client.query("SELECT * FROM locations WHERE id = $1", [locationId]);
    const location = result.rows;

    if (!location.length) {
      return res.status(404).send("Локация не найдена");
    }

    const reviewResult = await client.query("SELECT * FROM reviews WHERE location_id = $1", [locationId]);
    location[0].reviews = reviewResult.rows;
    res.json(location[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка при получении локации");
  }
});

// Новый эндпоинт для получения всех отзывов
app.get("/reviews", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM reviews");
    const reviews = result.rows;
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка при получении отзывов");
  }
});

// Новый эндпоинт для получения отзыва по ID
app.get("/reviews/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await client.query("SELECT * FROM reviews WHERE id = $1", [reviewId]);
    const review = result.rows;

    if (!review.length) {
      return res.status(404).send("Отзыв не найден");
    }

    res.json(review[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка при получении отзыва");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

