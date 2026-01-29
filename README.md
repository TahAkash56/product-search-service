# Product Search & Ranking Microservice

This project implements a backend microservice for storing, searching, and ranking
products for an e-commerce platform targeting Tier-2 and Tier-3 cities in India.

The focus is on building an explainable, intent-aware product ranking system.

---

## Tech Stack
- Node.js
- Express.js
- In-memory data store (Map)

---

## Features Implemented

### 1. Product Catalog
- Store products in-memory
- Auto-generated product IDs
- Flexible metadata support (RAM, storage, color, category, etc.)

### 2. Metadata Enrichment
- Update product metadata via API
- Schema-less design for extensibility

### 3. Search & Ranking
- Keyword-based product recall
- Scoring-based ranking model
- Intent-aware ranking (cheap, latest, budget-based queries)

---

## APIs

### Store Product
**POST** `/api/v1/product`

Stores a product in the catalog.

---

### Update Product Metadata
**PUT** `/api/v1/product/meta-data`

Adds or updates flexible metadata attributes.

---

### Search Products
**GET** `/api/v1/search/product?query=...`

Returns ranked products based on:
- Relevance
- Rating
- Price
- Stock
- Popularity
- Recency
- User intent

---

## Ranking Logic (High Level)

Each product is assigned a score based on weighted signals:
- Rating (quality)
- Price (cheap intent boosted)
- Stock availability
- Units sold (popularity)
- Recency (latest intent boosted)
- Text relevance

Final ranking is done by sorting products by total score.

---

## Intent Detection

The system detects user intent from the query:
- Cheap intent (e.g. "sasta", "cheap")
- Latest intent (e.g. "latest", "new")
- Budget constraints (e.g. "50k")

Intent dynamically reweights ranking signals.

---

## Assumptions & Trade-offs

- In-memory storage used for simplicity and low latency
- Rule-based ranking instead of ML models
- No external search engine (Elasticsearch, etc.)
- Input validation kept minimal due to time constraint

---

## How to Run

```bash
npm install
node src/server.js
