# GameTopUp Hub Architecture

## Completed in this package

- Production Prisma schema in `prisma/schema.prisma`
- Idempotent Prisma seed script in `prisma/seed.ts`
- Next.js App Router folder structure
- Admin, reseller, consumer, auth, checkout, orders, products route placeholders
- API route placeholders for auth, payment proof upload, and future webhooks
- Basic lib placeholders for db, auth, password hashing, RBAC, money helpers, constants, validations
- Server layer placeholders for actions, services, and repositories

## Still to implement later

- NextAuth Credentials provider integration
- Login/register UI
- Storefront product browsing UI
- Checkout flow
- Payment proof upload implementation
- Admin payment review
- Admin product management
- Admin order management
- Reseller wallet and wallet deduction flow
- RBAC middleware enforcement
- Reports dashboard
- Support ticket UI
- Secure object storage integration
