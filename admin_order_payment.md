# Step 9 — Admin Payment Review & Order Management

This patch implements the admin operations layer for manual payment review and order fulfillment.

## Added routes

- `/admin/payments`
- `/admin/orders`
- `/admin/orders/[orderNumber]`

## Added capabilities

### Payment review

Admins can:

- View payment proofs
- Filter payments by review status
- Search by order number, customer name, or customer email
- Approve pending payments
- Reject pending payments with a reason

When a payment is approved:

- `payment.status = APPROVED`
- `order.paymentStatus = PAID`
- `order.orderStatus = PROCESSING`
- `order.deliveryStatus = PROCESSING`
- A notification is created
- An audit log is created

When a payment is rejected:

- `payment.status = REJECTED`
- `order.paymentStatus = REJECTED`
- `order.orderStatus = CANCELLED`
- `order.deliveryStatus = NOT_STARTED`
- Rejection reason is saved
- A notification is created
- An audit log is created

> Note: The original prompt mentioned `PAYMENT_REJECTED`, but the current Prisma schema does not include that enum value. This patch safely uses `OrderStatus.CANCELLED` for rejected manual payments.

### Order management

Admins can:

- Search orders by order number, game ID, email, phone, or customer account
- Filter by order status, payment status, delivery status, and product
- View order details
- View game/delivery information
- View related payment records
- Save internal notes
- Save customer-visible notes
- Add proof of delivery URL/note
- Mark order completed
- Mark order failed
- Cancel order
- Mark order refunded

## Security and integrity

- Admin-only server-side guard is enforced.
- Payment approval/rejection uses database transactions.
- Already reviewed payments cannot be approved/rejected again.
- Customer-visible notes and internal notes are separated.
- Audit logs are written for sensitive actions.
- Notifications are created for customer-facing status changes.

## Files changed

```txt
app/admin/payments/page.tsx
app/admin/orders/page.tsx
app/admin/orders/[orderNumber]/page.tsx

components/admin/orders/admin-order-filter-bar.tsx
components/admin/orders/admin-order-table.tsx
components/admin/orders/admin-payment-filter-bar.tsx
components/admin/orders/order-management-forms.tsx
components/admin/orders/order-notes-form.tsx
components/admin/orders/payment-review-table.tsx
components/admin/orders/status-badge.tsx

lib/validations/admin-order-payment.schema.ts
server/actions/admin-order-payment.actions.ts
server/services/admin-order-payment.service.ts
```

## Manual test checklist

1. Login as admin.
2. Open `/admin/payments`.
3. Approve a pending payment.
4. Confirm the order changes to `PAID / PROCESSING / PROCESSING`.
5. Reject another pending payment and verify rejection reason is saved.
6. Open `/admin/orders`.
7. Search/filter orders.
8. Open `/admin/orders/[orderNumber]`.
9. Save customer/internal notes.
10. Mark an order completed and verify status changes.
11. Mark an order failed/cancelled/refunded where appropriate.
12. Confirm consumer/reseller users cannot access admin pages.

## Commands

```bash
npm run dev
```

If TypeScript or Prisma client types are stale after schema changes:

```bash
npx prisma generate
```
