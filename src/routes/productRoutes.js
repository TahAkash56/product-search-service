const express = require("express");
const router = express.Router();
const productRepo = require("../repositories/productRepository");
const searchService = require("../services/searchService");

router.post("/api/v1/product", (req, res) => {
  try {
    const product = productRepo.addProduct(req.body);

    res.status(201).json({
      productId: product.productId
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to store product"
    });
  }
});

router.put("/api/v1/product/meta-data", (req, res) => {
  try {
    const { productId, Metadata } = req.body;

    const updatedProduct = productRepo.updateMetadata(
      Number(productId),
      Metadata
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      productId: updatedProduct.productId,
      Metadata: updatedProduct.metadata
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update metadata"
    });
  }
});

router.get("/api/v1/search/product", (req, res) => {
  try {
    const { query } = req.query;

    const results = searchService.search(query);

    // ✅ SMALL GUARD ADDED HERE
    if (!results || results.length === 0) {
      return res.json({
        data: [],
        message: "No relevant products found"
      });
    }

    return res.json({
      data: results
    });
  } catch (err) {
    return res.status(500).json({
      message: "Search failed"
    });
  }
});


module.exports = router;
