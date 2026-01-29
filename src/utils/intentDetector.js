function detectIntent(query) {
  const q = query.toLowerCase();

  return {
    cheap: /sasta|sastha|cheap|low price|budget/.test(q),
    latest: /latest|new|newest/.test(q),
    storage: /storage|gb|tb/.test(q),
    priceLimit: extractPriceLimit(q)
  };
}

function extractPriceLimit(query) {
  // matches 50k, 50000, 50,000
  const match = query.match(/(\d+)\s?k/);
  if (match) return Number(match[1]) * 1000;

  const numMatch = query.match(/\d{4,6}/);
  if (numMatch) return Number(numMatch[0]);

  return null;
}

module.exports = detectIntent;
