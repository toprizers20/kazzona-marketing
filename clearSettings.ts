import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Safety check: require explicit confirmation
  const confirmFlag = process.argv.includes('--confirm');
  
  if (!confirmFlag) {
    console.log("⚠️  This script will DELETE ALL site settings from the database.");
    console.log("To proceed, run: npx tsx clearSettings.ts --confirm");
    process.exit(0);
  }

  console.log("🗑️  Deleting all site settings...");
  
  try {
    const result = await prisma.siteSettings.deleteMany();
    console.log(`✅ Deleted ${result.count} site settings records.`);
    console.log("Settings will be reset to defaults on next page load.");
  } catch (error) {
    console.error("❌ Failed to delete site settings:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
