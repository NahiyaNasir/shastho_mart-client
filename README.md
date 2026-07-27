# MediStore 💊

MediStore is a full-stack e-commerce platform for purchasing **Over-the-Counter (OTC) medicines**. It provides a seamless experience for customers to browse medicines, place orders, and track purchases, while enabling sellers to manage inventory and fulfill orders. Administrators have complete control over users, medicines, and platform operations.

---

## 🚀 Live Demo

- **Frontend:** https://shastho-mart-client.vercel.app
- **Backend API:**  https://shastho-mart.vercel.app/

---


# ✨ Features

### 👤 Customer
- Register and login securely
- Browse OTC medicines
- Search and filter medicines
- View medicine details
- Add medicines to cart
- Update cart quantity
- Place orders
- View order history
- Track order status
- Leave medicine reviews

### 🏪 Seller
- Secure authentication
- Add new medicines
- Edit medicine information
- Delete medicines
- Manage inventory
- View customer orders
- Update order status
- Dashboard with sales overview

### 🛡️ Admin
- Manage all users
- Manage sellers
- Manage medicines
- View all orders
- Monitor platform activity
- Approve or suspend sellers
- Dashboard with platform statistics

---

# 🛠️ Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Axios
- React Hook Form
- Zod

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt
- Express Validator / Zod

---

# 📁 Project Structure

```
MediStore
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   ├── types
│   └── utils
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middlewares
│   │   ├── services
│   │   ├── utils
│   │   └── config
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

- JWT Authentication
- Password hashing using Bcrypt
- Role-based Authorization

Supported Roles:

- Customer
- Seller
- Admin

---

# 📦 Database

Database: **PostgreSQL**

ORM: **Prisma**

Example entities:

- User
- Medicine
- Category
- Cart
- CartItem
- Order
- OrderItem
- Review

---

# 📡 REST API

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

## Medicines

```
GET    /api/medicines
GET    /api/medicines/:id
POST   /api/medicines
PATCH  /api/medicines/:id
DELETE /api/medicines/:id
```

## Categories

```
GET    /api/categories
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

## Cart

```
GET    /api/cart
POST   /api/cart
PATCH  /api/cart/:id
DELETE /api/cart/:id
```

## Orders

```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id
```

## Reviews

```
POST   /api/reviews
GET    /api/reviews/:medicineId
```

## Users (Admin)

```
GET    /api/users
PATCH  /api/users/:id
DELETE /api/users/:id
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/your-username/medistore.git
```

## Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# 🔧 Environment Variables

## Backend (.env)

```env
PORT=5000

DATABASE_URL="postgresql://username:password@localhost:5432/medistore"

JWT_SECRET=your_secret_key

NODE_ENV=development
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# ▶️ Running the Project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 🗄️ Prisma Commands

Generate Prisma Client

```bash
npx prisma generate
```

Create Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

Reset Database

```bash
npx prisma migrate reset
```

---

# 📸 Screenshots

| Home | Medicine Details |
|------|------------------|
| Add Screenshot | Add Screenshot |

| Cart | Dashboard |
|------|-----------|
| Add Screenshot | Add Screenshot |

---

# 🧪 Future Improvements

- Online Payment Integration
- Email Notifications
- Prescription Upload
- Wishlist
- Coupons & Discounts
- Medicine Recommendations
- Inventory Analytics
- Multi-language Support
- Dark Mode

---



---

⭐ If you found this project helpful, please consider giving it a star on GitHub!This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
