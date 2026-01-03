import Redis from 'ioredis';

let redis: Redis | null = null;

if (process.env.NODE_ENV !== 'test') {
  redis = new Redis({
    host: '127.0.0.1',
    port: 6379
  });

  redis.on('connect', () => {
    console.log('Redis connected');
  });

  redis.on('error', (err) => {
    console.error('Redis error', err);
  });
}

export default redis;
