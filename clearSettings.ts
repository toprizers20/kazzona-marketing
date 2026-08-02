import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.siteSettings.deleteMany();
  console.log("Deleted site settings to force default layout.");
}
main();
