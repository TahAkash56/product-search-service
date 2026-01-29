class Product {
  constructor({
    productId,
    title,
    description,
    rating,
    stock,
    price,
    mrp,
    currency,
    metadata = {},
    unitsSold = 0,
    returnRate = 0,
    createdAt = new Date()
  }) {
    this.productId = productId;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.stock = stock;
    this.price = price;
    this.mrp = mrp;
    this.currency = currency;

    // Flexible attributes like ram, storage, color, model, category
    this.metadata = metadata;

    // Ranking-related fields
    this.unitsSold = unitsSold;
    this.returnRate = returnRate;
    this.createdAt = createdAt;
  }
}

module.exports = Product;
