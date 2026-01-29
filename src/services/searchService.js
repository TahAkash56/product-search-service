const productRepo = require("../repositories/productRepository");
const rankingService = require("./rankingService");

class SearchService {
  search(query) {
    if (!query) return [];

    const normalizedQuery = query.toLowerCase();
    const products = productRepo.getAllProducts();

    // 1️⃣ Recall phase: find matching products
    const matchedProducts = products.filter(product => {
      const titleMatch =
        product.title &&
        product.title.toLowerCase().includes(normalizedQuery);

      const descriptionMatch =
        product.description &&
        product.description.toLowerCase().includes(normalizedQuery);

      const metadataMatch = Object.values(product.metadata || {}).some(value =>
        String(value).toLowerCase().includes(normalizedQuery)
      );

      return titleMatch || descriptionMatch || metadataMatch;
    });

    // 2️⃣ Ranking phase: score & sort
    return rankingService.rank(matchedProducts, query);
  }
}

module.exports = new SearchService();
