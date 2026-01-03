# 📺 Watchlist Service

A backend service that allows users to manage a personal watchlist of movies and TV shows.  
Users can add items, remove items, and retrieve their watchlist efficiently.

The service is designed for **read-heavy traffic**, optimized using **MongoDB** for persistence and **Redis** for caching.

---

## ✨ Features

- Add movies or TV shows to a watchlist
- Remove items from the watchlist
- Fetch paginated watchlist
- Idempotent write operations
- Read-optimized using Redis cache
- MongoDB-backed persistence
- Integration tests using Mocha & Chai
- Simple data seeding script for local testing

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Atlas)
- Redis
- Mocha, Chai, Supertest

---

## 📁 Project Structure

```
/
 ├── app.ts            # Express app (no side effects)
 ├── bin/server.ts         # Bootstrap (DB connect + server start)
 ├── controllers/
 ├── routes/
 ├── services/
 ├── models/
 └── utils/

tests/
 ├── setup.ts
 └── watchlist.test.ts

scripts/
 └── seed.ts           # Data seeding script
```

---

## 🔐 Assumptions

- Basic authentication is assumed to exist.
- A **mock user ID (`mock-user-1`)** is used throughout the system.
- Movies and TV shows are referenced using IDs (`contentId`).
- Movie and TV show metadata is assumed to be managed by another service.
- This service focuses only on watchlist management.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or local)
- Redis

### Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/watchlist
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
NODE_ENV=development
```

---

## ▶️ Running the Application

```
npm install
npm run dev
```

Server starts on `http://localhost:3000`

---

## 🧪 Running Tests

```
npm test
```

- Uses a separate test database
- Database is cleared before each test
- Redis is bypassed during tests

---

## 🌱 Data Seeding

To populate sample data without running tests:

```
npm run seed
```

This creates a mock user and sample watchlist data.

---

## 📌 API Endpoints

### Get Watchlist
```
GET /api/watchlist?page=1&limit=20
```

### Add to Watchlist
```
POST /api/watchlist
```

Body:
```
{
  "contentId": "movie-1",
  "contentType": "MOVIE"
}
```

### Remove from Watchlist
```
DELETE /api/watchlist/:contentId
```

---

## 🚀 Design & Scalability

- MongoDB document-based modeling (user-centric)
- Redis cache-aside pattern for fast reads
- Stateless service, horizontally scalable
- Idempotent write operations verified via tests

---

## 👤 Author

Built as part of a backend engineering assignment focusing on scalability, correctness, and clean architecture.
