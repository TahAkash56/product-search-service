class RankingService {
  rank(products, query, intent = {}) {
    const scoredProducts = products.map(product => {
      const score = this.computeScore(product, query, intent);
      return { product, score };
    });

    scoredProducts.sort((a, b) => b.score - a.score);

    return scoredProducts.map(item => item.product);
  }

  computeScore(product, query, intent) {
    let score = 0;

    score += this.ratingScore(product);
    score += this.priceScore(product, intent);
    score += this.stockScore(product);
    score += this.popularityScore(product);
    score += this.recencyScore(product, intent);
    score += this.relevanceScore(product, query);

    return score;
  }

  ratingScore(product) {
    return (product.rating || 0) * 2; // max ~10
  }

  priceScore(product, intent) {
    let score = product.price ? (1 / product.price) * 100000 : 0;

    if (intent.cheap) {
      score *= 2;
    }

    if (intent.priceLimit && product.price > intent.priceLimit) {
      score -= 20;
    }

    return score;
  }

  stockScore(product) {
    if (product.stock > 0) return 5;
    return -10;
  }

  popularityScore(product) {
    return Math.log((product.unitsSold || 0) + 1) * 2;
  }

  recencyScore(product, intent) {
    const daysOld =
      (Date.now() - new Date(product.createdAt).getTime()) /
      (1000 * 60 * 60 * 24);

    if (intent.latest) {
      return daysOld < 30 ? 10 : -5;
    }

    return daysOld < 30 ? 5 : 0;
  }

  relevanceScore(product, query) {
    if (!query) return 0;

    const q = query.toLowerCase();
    let score = 0;

    if (product.title?.toLowerCase().includes(q)) score += 10;
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
