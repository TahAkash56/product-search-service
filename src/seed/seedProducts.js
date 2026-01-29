const productRepo = require("../repositories/productRepository");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seedProducts(count = 1000) {
  const models = [
    "iPhone 12",
    "iPhone 13",
    "iPhone 14",
    "iPhone 15",
    "iPhone 16"
  ];

  const colors = ["Black", "White", "Blue", "Red"];
  const storages = ["64GB", "128GB", "256GB", "512GB"];

  for (let i = 0; i < count; i++) {
    const model = models[random(0, models.length - 1)];
    const color = colors[random(0, colors.length - 1)];
    const storage = storages[random(0, storages.length - 1)];

    productRepo.addProduct({
      title: `${model} ${storage} ${color}`,
      description: `${model} smartphone with ${storage} storage in ${color}`,
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      stock: random(0, 500),
      price: random(30000, 120000),
      mrp: random(35000, 130000),
      currency: "INR",
      unitsSold: random(10, 10000),
      returnRate: Math.random() * 0.3,
      metadata: {
        model,
        color,
        storage,
        category: "mobile"
      }
    });
  }

  console.log(`Seeded ${count} products`);
}

module.exports = seedProducts;
