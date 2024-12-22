export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'c1a2r3l4k5l6i7n8k9',
    expiresIn: '24h',
  },
  db: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'klinkify',
    password: process.env.DB_PASSWORD || 'KLINKOV11',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  },
  api: {
    jamendo: {
      key: process.env.JAMENDO_API_KEY || 'ba08b20a',
      baseUrl: 'https://api.jamendo.com/v3.0',
    },
  },
};