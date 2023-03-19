const prisma = require("./src/config/prisma");

async function main() {
  await prisma.donor.deleteMany();
}

main();
