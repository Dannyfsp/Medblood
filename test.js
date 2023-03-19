const prisma = require("./src/config/prisma");

async function main() {
  await prisma.donation.deleteMany();
}

main();
