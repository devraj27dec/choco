# Choco - Chocolate E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js for selling chocolate products. Features include product management, order processing, inventory tracking, warehouse management, and delivery person assignment.

## 🚀 Features

### Customer Features
- Browse and search chocolate products
- Product details with ratings and reviews
- Secure checkout with Stripe payment integration
- Order history and tracking
- Store locator with warehouse locations
- User authentication with NextAuth

### Admin Features
- Product management (CRUD operations)
- Order management and status updates
- Warehouse management with location coordinates
- Inventory tracking and management
- Delivery person assignment
- Real-time order status updates

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2.5
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payment:** Stripe
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query
- **UI Components:** Radix UI + Tailwind CSS
- **Form Handling:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database
- Stripe account (for payment processing)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devraj27dec/choco.git
   cd choco
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/choco_db"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   
   # OAuth Providers (if using)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   # npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
choco/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js app router
│   │   ├── (client)/          # Client-facing pages
│   │   │   ├── account/       # User account pages
│   │   │   ├── product/       # Product detail pages
│   │   │   ├── payment/       # Payment pages
│   │   │   └── store-locator/ # Store locator page
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── products/      # Product management
│   │   │   ├── orders/        # Order management
│   │   │   ├── warehouses/    # Warehouse management
│   │   │   ├── inventories/   # Inventory management
│   │   │   └── delivery-persons/ # Delivery person management
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utility functions and validators
│   ├── store/                 # Zustand state management
│   ├── types/                 # TypeScript type definitions
│   ├── http/                  # HTTP client configuration
│   └── providers/             # React context providers
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🗄️ Database Schema

The application uses the following main models:
- **User** - Customer and admin accounts
- **Product** - Chocolate products
- **Order** - Customer orders
- **Warehouse** - Storage locations with coordinates
- **Inventory** - Product inventory per warehouse
- **DeliveryPerson** - Delivery personnel
- **Rating** - Product ratings by users

## 🔐 Authentication

The application uses NextAuth.js for authentication. Supported providers:
- Email/Password (if configured)
- OAuth providers (Google, etc.)

## 💳 Payment Integration

Stripe is integrated for secure payment processing:
- Payment intents creation
- Webhook handling for payment callbacks
- Success and return pages

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Environment Variables for Production
Make sure to set all required environment variables in your production environment:
- Update `DATABASE_URL` with production database
- Set `NEXTAUTH_URL` to your production domain
- Use production Stripe keys
- Configure OAuth providers with production URLs

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

