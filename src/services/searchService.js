const productRepo = require("../repositories/productRepository");
const rankingService = require("./rankingService");
const detectIntent = require("../utils/intentDetector");

class SearchService {
  search(query) {
    if (!query) return [];

    const normalizedQuery = query.toLowerCase();
    const products = productRepo.getAllProducts();

    // 1️⃣ Recall phase
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

    // 2️⃣ Detect intent
    const intent = detectIntent(query);

    // 3️⃣ Rank results
    return rankingService.rank(matchedProducts, query, intent);
  }
}

module.exports = new SearchService();
