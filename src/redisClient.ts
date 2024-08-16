import Redis from 'ioredis';

// Use environment variables for Redis connection configuration
const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Provide a fallback string
  port: parseInt(process.env.REDIS_PORT || '8000', 10), // Ensure port is as always a number
  password: process.env.REDIS_PASSWORD || '', // Provide a fallback string
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;
