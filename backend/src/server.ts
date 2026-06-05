
import app from './app';
import { prisma } from './config/db';


const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();         // DB first, then server
    console.log("Database connection successful");
  
    app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
  } catch (error) {
    console.log("Database connection failed");
    await prisma.$disconnect();
    process.exit(1); 
  }
}

startServer();

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing Prisma connection...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing Prisma connection...");
  await prisma.$disconnect();
  process.exit(0);
});