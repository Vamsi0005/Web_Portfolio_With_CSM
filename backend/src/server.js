import app from './app.js';
import { config } from './config/env.js';
import prisma from './config/db.js';

const PORT = config.port || 5000;

const server = app.listen(PORT, async () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Portfolio API Server is running on port: ${PORT}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Base URL: ${config.baseUrl}`);
  console.log(`📊 Health Endpoint: ${config.baseUrl}/api/health`);
  console.log(`==================================================\n`);

  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL database successfully.');
  } catch (dbError) {
    console.error('❌ Failed to connect to PostgreSQL database:', dbError.message);
  }
});

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  console.log(`\n[${signal}] Initiating graceful shutdown...`);
  server.close(async () => {
    console.log('🛑 HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('📦 PostgreSQL connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnect:', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
