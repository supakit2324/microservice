export default (): any => ({
  provider: process.env.PROVIDER_USERS || 'BookShop',
  port: parseInt(process.env.APP_USERS_PORT, 10) || 4001,
  rmq: process.env.RMQ || '',
  tcpUser: parseInt(process.env.TCP_PORT_USERS, 10),
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  authentication: {
    hashSize: 10,
    secret: process.env.JWT_SECRET || 'super_secret',
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'http://localhost',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '7d',
    },
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  database: {
    host: process.env.MONGODB_URI,
    options: {
      dbName: process.env.DB_NAME || 'BS-',
      w: 'majority',
    },
  },
});
