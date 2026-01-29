class RankingService {
  rank(products, query) {
    const scoredProducts = products.map(product => {
      const score = this.computeScore(product, query);
      return { product, score };
    });

    scoredProducts.sort((a, b) => b.score - a.score);

    return scoredProducts.map(item => item.product);
  }

  computeScore(product, query) {
    let score = 0;

    score += this.ratingScore(product);
    score += this.priceScore(product);
    score += this.stockScore(product);
    score += this.popularityScore(product);
    score += this.recencyScore(product);
    score += this.relevanceScore(product, query);

    return score;
  }

  ratingScore(product) {
    return (product.rating || 0) * 2; 
  }

  priceScore(product) {
    return product.price ? (1 / product.price) * 100000 : 0;
  }

  stockScore(product) {
    if (product.stock > 0) return 5;
    return -10; // penalize out of stock
  }

  popularityScore(product) {
    return Math.log((product.unitsSold || 0) + 1) * 2;
  }

  recencyScore(product) {
    const daysOld =
      (Date.now() - new Date(product.createdAt).getTime()) /
      (1000 * 60 * 60 * 24);

    return daysOld < 30 ? 5 : 0;
  }

  relevanceScore(product, query) {
    if (!query) return 0;

    const q = query.toLowerCase();
    let score = 0;

    if (product.title.toLowerCase().includes(q)) score += 10;
    if (product.description?.toLowerCase().includes(q)) score += 5;

    Object.values(product.metadata || {}).forEach(val => {
      if (String(val).toLowerCase().includes(q)) {
        score += 3;
      }
    });

    return score;
  }
}

module.exports = new RankingService();
