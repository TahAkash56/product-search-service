const Product = require("../models/product");

class ProductRepository {
  constructor() {
    this.products = new Map();
    this.currentId = 1;
  }

  addProduct(productData) {
    const product = new Product({
      productId: this.currentId++,
      ...productData
    });

    this.products.set(product.productId, product);
    return product;
  }

  getProductById(productId) {
    return this.products.get(productId);
  }

  getAllProducts() {
    return Array.from(this.products.values());
  }

  updateMetadata(productId, metadata) {
    const product = this.products.get(productId);

    if (!product) {
        return null;
    }

    product.metadata = {
        ...product.metadata,
        ...metadata
    };

    return product;
    }
}

module.exports = new ProductRepository();
