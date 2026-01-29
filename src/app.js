const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");

app.use(express.json());

app.use(productRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
