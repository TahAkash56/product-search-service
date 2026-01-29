const productRepo = require("../repositories/productRepository");

class SearchService {
  search(query) {
    if (!query) return [];

    const normalizedQuery = query.toLowerCase();
    const products = productRepo.getAllProducts();

    return products.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(normalizedQuery);
      const descriptionMatch =
        product.description &&
        product.description.toLowerCase().includes(normalizedQuery);

      const metadataMatch = Object.values(product.metadata || {}).some(value =>
        String(value).toLowerCase().includes(normalizedQuery)
      );

      return titleMatch || descriptionMatch || metadataMatch;
    });
  }
}

module.exports = new SearchService();
