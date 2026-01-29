const express = require("express");
const router = express.Router();
const productRepo = require("../repositories/productRepository");

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

module.exports = router;
