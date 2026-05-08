import {
  PrismaClient,
  UserRole,
  UserStatus,
  StockStatus,
  DeliveryMethod,
  WalletTransactionType,
  WalletTransactionStatus,
} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const BCRYPT_ROUNDS = 12;

const resellerTiers = [
  { name: "Bronze", discountPercentage: "3.00", minimumMonthlyVolume: "0.00" },
  { name: "Silver", discountPercentage: "6.00", minimumMonthlyVolume: "50000.00" },
  { name: "Gold", discountPercentage: "9.00", minimumMonthlyVolume: "150000.00" },
  { name: "Platinum", discountPercentage: "12.00", minimumMonthlyVolume: "300000.00" },
  { name: "VIP", discountPercentage: "15.00", minimumMonthlyVolume: "500000.00" },
];

const categories = [
  { name: "Mobile Legends", slug: "mobile-legends", image: "/images/categories/mobile-legends.png", sortOrder: 1 },
  { name: "PUBG Mobile", slug: "pubg-mobile", image: "/images/categories/pubg-mobile.png", sortOrder: 2 },
  { name: "Free Fire", slug: "free-fire", image: "/images/categories/free-fire.png", sortOrder: 3 },
  { name: "Roblox", slug: "roblox", image: "/images/categories/roblox.png", sortOrder: 4 },
  { name: "Steam", slug: "steam", image: "/images/categories/steam.png", sortOrder: 5 },
  { name: "Gift Cards", slug: "gift-cards", image: "/images/categories/gift-cards.png", sortOrder: 6 },
];

const mlbbRequiredFields = {
  fields: [
    { key: "gameUserId", label: "Player ID", type: "text", required: true, placeholder: "Enter your MLBB Player ID" },
    { key: "gameServerId", label: "Server ID", type: "text", required: true, placeholder: "Enter your MLBB Server ID" },
    { key: "gameCharacterName", label: "Character Name", type: "text", required: false, placeholder: "Optional character name" },
  ],
};

const pubgRequiredFields = {
  fields: [
    { key: "gameUserId", label: "PUBG Player ID", type: "text", required: true, placeholder: "Enter your PUBG Player ID" },
    { key: "gameCharacterName", label: "Character Name", type: "text", required: false, placeholder: "Optional character name" },
  ],
};

const freeFireRequiredFields = {
  fields: [
    { key: "gameUserId", label: "Free Fire Player ID", type: "text", required: true, placeholder: "Enter your Free Fire Player ID" },
    { key: "gameCharacterName", label: "Character Name", type: "text", required: false, placeholder: "Optional character name" },
  ],
};

const giftCardRequiredFields = {
  fields: [
    { key: "customerEmail", label: "Delivery Email", type: "email", required: true, placeholder: "Enter delivery email" },
    { key: "customerPhone", label: "Customer Phone", type: "tel", required: false, placeholder: "Optional contact phone" },
  ],
};

const products = [
  { categorySlug: "mobile-legends", name: "MLBB 86 Diamonds", slug: "mlbb-86-diamonds", gameName: "Mobile Legends: Bang Bang", consumerPrice: "2200.00", supplierCost: "1850.00", requiredFieldsJson: mlbbRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-15 minutes", active: true, sortOrder: 1 },
  { categorySlug: "mobile-legends", name: "MLBB 172 Diamonds", slug: "mlbb-172-diamonds", gameName: "Mobile Legends: Bang Bang", consumerPrice: "4300.00", supplierCost: "3700.00", requiredFieldsJson: mlbbRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-15 minutes", active: true, sortOrder: 2 },
  { categorySlug: "mobile-legends", name: "MLBB 257 Diamonds", slug: "mlbb-257-diamonds", gameName: "Mobile Legends: Bang Bang", consumerPrice: "6400.00", supplierCost: "5550.00", requiredFieldsJson: mlbbRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-15 minutes", active: true, sortOrder: 3 },
  { categorySlug: "mobile-legends", name: "MLBB 344 Diamonds", slug: "mlbb-344-diamonds", gameName: "Mobile Legends: Bang Bang", consumerPrice: "8500.00", supplierCost: "7400.00", requiredFieldsJson: mlbbRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-15 minutes", active: true, sortOrder: 4 },
  { categorySlug: "mobile-legends", name: "MLBB Weekly Diamond Pass", slug: "mlbb-weekly-diamond-pass", gameName: "Mobile Legends: Bang Bang", consumerPrice: "5200.00", supplierCost: "4550.00", requiredFieldsJson: mlbbRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-30 minutes", active: true, sortOrder: 5 },
  { categorySlug: "pubg-mobile", name: "PUBG 60 UC", slug: "pubg-60-uc", gameName: "PUBG Mobile", consumerPrice: "1600.00", supplierCost: "1350.00", requiredFieldsJson: pubgRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-30 minutes", active: true, sortOrder: 1 },
  { categorySlug: "pubg-mobile", name: "PUBG 325 UC", slug: "pubg-325-uc", gameName: "PUBG Mobile", consumerPrice: "7800.00", supplierCost: "6800.00", requiredFieldsJson: pubgRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-30 minutes", active: true, sortOrder: 2 },
  { categorySlug: "pubg-mobile", name: "PUBG 660 UC", slug: "pubg-660-uc", gameName: "PUBG Mobile", consumerPrice: "15500.00", supplierCost: "13600.00", requiredFieldsJson: pubgRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-30 minutes", active: true, sortOrder: 3 },
  { categorySlug: "free-fire", name: "Free Fire 100 Diamonds", slug: "free-fire-100-diamonds", gameName: "Free Fire", consumerPrice: "1800.00", supplierCost: "1500.00", requiredFieldsJson: freeFireRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "5-15 minutes", active: true, sortOrder: 1 },
  { categorySlug: "roblox", name: "Roblox Gift Card", slug: "roblox-gift-card", gameName: "Roblox", consumerPrice: "12000.00", supplierCost: "10500.00", requiredFieldsJson: giftCardRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "10-60 minutes", active: true, sortOrder: 1 },
  { categorySlug: "steam", name: "Steam Wallet $5", slug: "steam-wallet-5", gameName: "Steam", consumerPrice: "13500.00", supplierCost: "12000.00", requiredFieldsJson: giftCardRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "10-60 minutes", active: true, sortOrder: 1 },
  { categorySlug: "steam", name: "Steam Wallet $10", slug: "steam-wallet-10", gameName: "Steam", consumerPrice: "27000.00", supplierCost: "24000.00", requiredFieldsJson: giftCardRequiredFields, stockStatus: StockStatus.IN_STOCK, deliveryMethod: DeliveryMethod.MANUAL, estimatedDeliveryTime: "10-60 minutes", active: true, sortOrder: 2 },
];

const paymentMethods = [
  { name: "Bank Transfer", instructions: "Transfer the exact order amount to the listed bank account. Upload a clear screenshot or receipt after payment.", qrImage: null, accountName: "GameTopUp Hub", accountNumber: "1234567890", sortOrder: 1 },
  { name: "Mobile Wallet", instructions: "Send payment to the listed mobile wallet number. Upload the transaction screenshot after payment.", qrImage: "/images/payment/mobile-wallet-qr.png", accountName: "GameTopUp Hub", accountNumber: "+959000000000", sortOrder: 2 },
  { name: "USDT", instructions: "Send USDT to the provided wallet address using the correct network. Upload the transaction hash or payment screenshot.", qrImage: "/images/payment/usdt-qr.png", accountName: "USDT Wallet", accountNumber: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", sortOrder: 3 },
  { name: "Manual Payment", instructions: "Contact support for manual payment instructions, then upload payment proof after completing payment.", qrImage: null, accountName: "GameTopUp Hub", accountNumber: null, sortOrder: 4 },
];

function calculateTierPrice(consumerPrice: string, discountPercentage: string): string {
  const price = Number(consumerPrice);
  const discount = Number(discountPercentage);
  if (!Number.isFinite(price) || !Number.isFinite(discount)) throw new Error("Invalid price data");
  return (price * (1 - discount / 100)).toFixed(2);
}

async function seedResellerTiers() {
  for (const tier of resellerTiers) {
    await prisma.resellerTier.upsert({
      where: { name: tier.name },
      update: { discountPercentage: tier.discountPercentage, minimumMonthlyVolume: tier.minimumMonthlyVolume, active: true },
      create: { ...tier, active: true },
    });
  }
}

async function seedUsers() {
  const silverTier = await prisma.resellerTier.findUniqueOrThrow({ where: { name: "Silver" } });
  const [adminPasswordHash, resellerPasswordHash, consumerPasswordHash] = await Promise.all([
    bcrypt.hash("Admin123456!", BCRYPT_ROUNDS),
    bcrypt.hash("Reseller123456!", BCRYPT_ROUNDS),
    bcrypt.hash("User123456!", BCRYPT_ROUNDS),
  ]);

  await prisma.user.upsert({
    where: { email: "admin@gametopuphub.com" },
    update: { name: "GameTopUp Hub Admin", passwordHash: adminPasswordHash, role: UserRole.ADMIN, status: UserStatus.ACTIVE, resellerTierId: null, walletBalance: "0.00" },
    create: { name: "GameTopUp Hub Admin", email: "admin@gametopuphub.com", phone: "+959100000001", passwordHash: adminPasswordHash, role: UserRole.ADMIN, status: UserStatus.ACTIVE, resellerTierId: null, walletBalance: "0.00", referralCode: "ADMIN-HUB" },
  });

  await prisma.user.upsert({
    where: { email: "reseller@gametopuphub.com" },
    update: { name: "Demo Silver Reseller", passwordHash: resellerPasswordHash, role: UserRole.RESELLER, status: UserStatus.ACTIVE, resellerTierId: silverTier.id, walletBalance: "100000.00" },
    create: { name: "Demo Silver Reseller", email: "reseller@gametopuphub.com", phone: "+959100000002", passwordHash: resellerPasswordHash, role: UserRole.RESELLER, status: UserStatus.ACTIVE, resellerTierId: silverTier.id, walletBalance: "100000.00", referralCode: "RESELLER-SILVER" },
  });

  await prisma.user.upsert({
    where: { email: "user@gametopuphub.com" },
    update: { name: "Demo Consumer", passwordHash: consumerPasswordHash, role: UserRole.CONSUMER, status: UserStatus.ACTIVE, resellerTierId: null, walletBalance: "0.00" },
    create: { name: "Demo Consumer", email: "user@gametopuphub.com", phone: "+959100000003", passwordHash: consumerPasswordHash, role: UserRole.CONSUMER, status: UserStatus.ACTIVE, resellerTierId: null, walletBalance: "0.00", referralCode: "USER-DEMO" },
  });
}

async function seedCategories() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, image: category.image, active: true, sortOrder: category.sortOrder },
      create: { ...category, active: true },
    });
  }
}

async function seedProducts() {
  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: product.categorySlug } });
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        categoryId: category.id,
        name: product.name,
        gameName: product.gameName,
        image: `/images/products/${product.slug}.png`,
        description: `${product.name} for ${product.gameName}. Manual fulfillment only. No game account buying or selling is supported.`,
        consumerPrice: product.consumerPrice,
        supplierCost: product.supplierCost,
        requiredFieldsJson: product.requiredFieldsJson,
        stockStatus: product.stockStatus,
        deliveryMethod: product.deliveryMethod,
        estimatedDeliveryTime: product.estimatedDeliveryTime,
        active: product.active,
        sortOrder: product.sortOrder,
      },
      create: {
        categoryId: category.id,
        name: product.name,
        slug: product.slug,
        gameName: product.gameName,
        image: `/images/products/${product.slug}.png`,
        description: `${product.name} for ${product.gameName}. Manual fulfillment only. No game account buying or selling is supported.`,
        consumerPrice: product.consumerPrice,
        supplierCost: product.supplierCost,
        requiredFieldsJson: product.requiredFieldsJson,
        stockStatus: product.stockStatus,
        deliveryMethod: product.deliveryMethod,
        estimatedDeliveryTime: product.estimatedDeliveryTime,
        active: product.active,
        sortOrder: product.sortOrder,
      },
    });
  }
}

async function seedProductResellerPrices() {
  const dbProducts = await prisma.product.findMany({ select: { id: true, consumerPrice: true } });
  const dbTiers = await prisma.resellerTier.findMany({ select: { id: true, discountPercentage: true } });
  for (const product of dbProducts) {
    for (const tier of dbTiers) {
      await prisma.productResellerPrice.upsert({
        where: { productId_resellerTierId: { productId: product.id, resellerTierId: tier.id } },
        update: { price: calculateTierPrice(product.consumerPrice.toString(), tier.discountPercentage.toString()) },
        create: { productId: product.id, resellerTierId: tier.id, price: calculateTierPrice(product.consumerPrice.toString(), tier.discountPercentage.toString()) },
      });
    }
  }
}

async function seedPaymentMethods() {
  for (const method of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: { name: method.name },
      update: { ...method, active: true },
      create: { ...method, active: true },
    });
  }
}

async function seedInitialWalletTransaction() {
  const reseller = await prisma.user.findUniqueOrThrow({ where: { email: "reseller@gametopuphub.com" } });
  const admin = await prisma.user.findUnique({ where: { email: "admin@gametopuphub.com" } });
  const reference = "SEED_INITIAL_RESELLER_BALANCE";
  const existing = await prisma.walletTransaction.findFirst({ where: { userId: reseller.id, type: WalletTransactionType.DEPOSIT, reference } });
  if (existing) {
    await prisma.walletTransaction.update({
      where: { id: existing.id },
      data: { amount: "100000.00", balanceBefore: "0.00", balanceAfter: "100000.00", status: WalletTransactionStatus.COMPLETED, reviewedBy: admin?.id ?? null, reviewedAt: new Date(), note: "Initial seeded wallet balance for the demo reseller account." },
    });
    return;
  }
  await prisma.walletTransaction.create({
    data: { userId: reseller.id, type: WalletTransactionType.DEPOSIT, amount: "100000.00", balanceBefore: "0.00", balanceAfter: "100000.00", status: WalletTransactionStatus.COMPLETED, reference, proofImage: null, reviewedBy: admin?.id ?? null, reviewedAt: new Date(), note: "Initial seeded wallet balance for the demo reseller account." },
  });
}

async function main() {
  console.log("Starting GameTopUp Hub seed...");
  await seedResellerTiers();
  await seedUsers();
  await seedCategories();
  await seedProducts();
  await seedProductResellerPrices();
  await seedPaymentMethods();
  await seedInitialWalletTransaction();
  console.log("GameTopUp Hub seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("GameTopUp Hub seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
