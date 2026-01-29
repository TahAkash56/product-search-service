const app = require("./app");
const seedProducts = require("./seed/seedProducts");

seedProducts(1000);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
