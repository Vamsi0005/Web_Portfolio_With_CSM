import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'fallback_access_secret_key_change_in_prod',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key_change_in_prod',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },
  cors: {
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    adminUrl: process.env.ADMIN_URL || 'http://localhost:5174',
  },
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  email: {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'Portfolio Contact <noreply@portfolio.local>',
    to: process.env.EMAIL_TO || 'admin@portfolio.local'
  }
};
