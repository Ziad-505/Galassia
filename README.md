<h1 align="center">✨ Galassia ✨</h1>
<h3 align="center">Luxury Gemstones & Fine Jewelry</h3>

![Galassia](/frontend/public/screenshot-for-readme.png)

## About Galassia

**Galassia** (Italian for "Galaxy") is a luxury e-commerce platform specializing in exquisite gemstones and fine jewelry. Our platform offers a curated collection of:

- 💎 **Diamonds** - Timeless brilliance for every occasion
- 💍 **Rings** - Engagement, wedding, and statement pieces
- 📿 **Necklaces** - Elegant chains and pendants
- 👂 **Earrings** - From subtle studs to dramatic drops
- ⌚ **Bracelets** - Delicate bangles and tennis bracelets
- 💎 **Gemstones** - Rubies, sapphires, emeralds, and rare stones

## Features

- 🛒 **Elegant Shopping Experience** - Beautifully designed interface
- 💳 **Secure Payments** - Stripe integration for safe transactions
- 🔐 **Robust Authentication** - JWT with Refresh/Access Tokens
- 👑 **Admin Dashboard** - Manage products and view analytics
- 📊 **Sales Analytics** - Track revenue and customer insights
- 🏷️ **Special Offers** - Coupon code system for VIP customers
- 🚀 **Redis Caching** - Lightning-fast performance
- 🎨 **Responsive Design** - Beautiful on all devices

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Cache**: Redis (Upstash)
- **Payments**: Stripe
- **Images**: Cloudinary

## Setup .env file

```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Run this app locally

```shell
npm run build
```

## Start the app

```shell
npm run start
```

---

<p align="center">
  <em>Galassia - Where Every Gem Tells a Story</em>
</p>
