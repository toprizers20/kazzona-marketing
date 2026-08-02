const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({});

async function main() {
  console.log('Seeding default AdminUser...');

  const defaultEmail = process.env.ADMIN_EMAIL || 'official.kazzona@gmail.com';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'KaZZona@0011@@';

  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const existingAdmins = await prisma.adminUser.findMany();
  
  if (existingAdmins.length > 0) {
    const admin = existingAdmins[0];
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { email: defaultEmail, passwordHash: passwordHash },
    });
    console.log(`Updated existing admin credentials to: ${defaultEmail}`);
  } else {
    await prisma.adminUser.create({
      data: {
        email: defaultEmail,
        passwordHash: passwordHash,
      },
    });
    console.log(`Created default admin: ${defaultEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
